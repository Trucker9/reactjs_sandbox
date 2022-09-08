// After Testing, we need to optimize our code. (memo + lazy)
// memo: learned previously
// lazy: here


import {Route, Switch, Redirect} from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import Layout from "./components/layout/Layout";
import React, {Suspense} from "react";

// lazy, split code into chunks and load(download) them on demand. (only when needed)
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));

function App() {
    return (
        <div>
            <Layout>
                <Suspense fallback={<div>--Add spinner here--</div>}>

                    <Switch>
                        <Route exact path="/quotes">
                            <AllQuotes/>
                        </Route>

                        <Route path="/quotes/:quoteId">
                            <QuoteDetail/>
                        </Route>

                        <Route path="/new-quote">
                            <NewQuote/>
                        </Route>

                        <Route exact path="/">
                            <Redirect to="/quotes"/>
                        </Route>
                        {/*
                    Anything can be a match with "*". but hence we are using switch, if it didn't match till the end,
                    our not found page will be rendered.
                    */}
                        <Route path={'*'}>
                            <NotFound/>
                        </Route>
                    </Switch>
                </Suspense>
            </Layout>
        </div>
    );
}

export default App;
