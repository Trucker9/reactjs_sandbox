import {Fragment} from 'react';
import {useParams, Route, Link} from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Max', text: 'Learning React is fun!'},
    {id: 'q2', author: 'Maximilian', text: 'Learning React is great!'},
];

const QuoteDetail = () => {
    const params = useParams();

    const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

    if (!quote) {
        return <p>No quote found!</p>;
    }

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author}/>

            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments/>
            </Route>
            {/*
            Rendering "comments" button conditionally based on url.
            */}
            <Route path={`/quotes/${params.quoteId}/`} exact>
                <div className='centered'>
                    <Link to={`/quotes/${params.quoteId}/comments`} className={'btn--flat'}> Load Comments </Link>
                </div>

            </Route>

        </Fragment>
    );
};

export default QuoteDetail;