import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from "../lib/api";
import {useEffect} from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
    const {
        sendRequest,
        status,
        data: loadedQuotesArr,
        err,
    } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

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
    if (status === 'completed' && loadedQuotesArr.length === 0) {
        return <NoQuotesFound/>
    }
    return <QuoteList quotes={loadedQuotesArr}/>
};

export default AllQuotes;
