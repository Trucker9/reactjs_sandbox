import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from "./components/MainHeader";

function App() {
    return (
        <div>
            <MainHeader/>
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