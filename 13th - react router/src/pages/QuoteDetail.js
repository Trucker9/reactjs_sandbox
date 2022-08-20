import {Route, useParams} from "react-router-dom";
import {Fragment} from "react";

import Comments from "../components/comments/Comments";

const QuoteDetail = () => {
    const params = useParams();

    return <Fragment>
        <h1>Quote Detail of id {params.quoteId} </h1>

        <Route path={`/quotes/${params.quoteId}/comments`}>

            <Comments/>
        </Route>
    </Fragment>
}

export default QuoteDetail;