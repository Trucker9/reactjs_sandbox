import {Route, Switch} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import MainHeader from "./components/MainHeader";

function App() {
    return (
        /*       the path we defined below means that the app will render <Products/>  whenever a path
                 STARTS with "/products". so the component will be rendered for "/products/:productId" as well

               --- <Route path="/products">
               ---     <Products/>
               --- </Route>
               --- <Route path="/products/:productId">
               ---     <ProductDetails/>
               --- </Route>

               the <Switch> component will render only the first component that matches the path
               the "exact" prop makes sure that the component is rendered only for the exact path
                  */
        <div>
            <MainHeader/>
            <main>

                <Switch>

                    <Route exact path="/welcome">
                        <Welcome/>
                    </Route>
                    <Route path="/products">
                        <Products/>
                    </Route>
                    <Route path="/products/:productId">
                        <ProductDetails/>
                    </Route>
                </Switch>
            </main>
        </div>
    );
}


export default App;

// npm install react-router-dom@5