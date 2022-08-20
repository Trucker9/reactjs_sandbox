import {Route, Switch, Redirect} from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
    return (
        <div>
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
        </div>
    );
}

export default App;
