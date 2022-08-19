import {Route} from "react-router-dom";


const Welcome = () => {

    return (
        <section>
            <h1>Welcome page</h1>
            {/* If this component renders we are at "/welcome"
            CONDITIONALLY we can render paragraph below if we are at "/welcome/userId" */
            }
            <Route path="/welcome/userId">
                <p> user component</p>
            </Route>
        </section>
    );
}

export default Welcome;