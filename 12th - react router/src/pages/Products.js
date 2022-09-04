import {Link, useNavigate} from "react-router-dom";

const Products = () => {


    return (
        <section>
            <h1>Products page</h1>
            <ul>
                <li>
                    <Link to="/products/p1"> A car </Link>
                </li>
                <li>
                    <Link to="/products/p2"> A motorcycle </Link>
                </li>
                <li>
                    <Link to="/products/p3"> A Hookah </Link>
                </li>
            </ul>
        </section>
    )
}

export default Products;