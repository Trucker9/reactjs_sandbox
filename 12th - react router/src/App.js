import {Navigate, Route, Routes} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import MainHeader from "./components/MainHeader";

function App() {

    // useHistory is replaced with useNavigate
    // const navigate = useNavigate();
    // navigate.('somewhere', {replace: true});
    // navigate(-2); // go back 2 pages
    // navigate(1); // go forward 1 page

    // <Prompt> is gone

    return (
        <div>
            <MainHeader/>
            <main>
                <Routes>

                    {/*
                    react-router will look for the best match of these routes.
                    ordering in not important. see docs I guess.
                    */}
                    <Route path="/" element={<Navigate replace to="/welcome"/>}/>

                    {/* The route below only works for exact path like "/welcome". we have a nested route in welcome
                     page, for that to work, we need to add "/*" */}
                    <Route path="/welcome/*" element={<Welcome/>}>
                        {/* the url is already "/welcome" ser we just add what we need more */}
                        <Route path="userId" element={<p> user component</p>}/>
                    </Route>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:productId" element={<ProductDetails/>}/>

                </Routes>
            </main>
        </div>
    );
}


export default App;

// npm install react-router-dom@5