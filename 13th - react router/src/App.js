import {Route, Switch, Redirect} from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <div>
            <Layout>
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

                </Switch>
            </Layout>
        </div>
    );
}

export default App;
