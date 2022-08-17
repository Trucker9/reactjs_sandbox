import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';

function App() {
    return (
        <div>
            {/* now welcome will only be visible if the url is /welcome */}
            <Route exact path="/welcome">
                <Welcome/>
            </Route>

            <Route exact path="/products">
                <Products/>
            </Route>

        </div>
    );
}


export default App;

// npm install react-router-dom@5