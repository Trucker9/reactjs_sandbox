import {useParams} from "react-router-dom";

const ProductDetails = () => {
    const params = useParams();

    return (
        <section>
            <h1>Product details page</h1>
            <p> The value stored in the url variable is {params.productId}</p>
        </section>
    )
}

export default ProductDetails;