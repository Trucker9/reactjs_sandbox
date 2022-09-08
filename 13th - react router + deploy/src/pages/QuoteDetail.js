import {Fragment, useEffect} from 'react';
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuoteDetail = () => {
    const match = useRouteMatch();

    const params = useParams();
    const {sendRequest, data: quote, status, err} = useHttp(getSingleQuote);

    const {quoteId} = params;
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);


    if (status === 'pending') {
        return <div className={'centered'}>
            <LoadingSpinner/>
        </div>
    }

    if (err) {
        return <div className={'centered focused'}>
            {err}
        </div>
    }

    if (!quote) {
        return <p>No quote found!</p>;
    }

    return (
        <Fragment>

            <HighlightedQuote text={quote.text} author={quote.author}/>

            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
            {/*
            Rendering "comments" button conditionally based on url.
            */}
            <Route path={`${match.url}/`} exact>
                <div className='centered'>
                    <Link to={`${match.path}/comments`} className={'btn--flat'}> Load Comments </Link>
                </div>

            </Route>

        </Fragment>
    );
};

export default QuoteDetail;