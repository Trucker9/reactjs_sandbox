import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import MainHeader from "./components/MainHeader";

function App() {
    return (
        <div>
            <main>
                <MainHeader/>
                <Route path="/welcome">
                    <Welcome/>
                </Route>

                <Route path="/products">
                    <Products/>
                </Route>
                {/* productId is the variable we are going to use in <ProductDetails> */}
                <Route path="/product-details/:productId">
                    <ProductDetails/>
                </Route>
            </main>
        </div>
    );
}


export default App;

// npm install react-router-dom@5