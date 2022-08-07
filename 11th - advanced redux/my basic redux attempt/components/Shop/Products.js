import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='Test1'
          price={6}
          description='This is a first product - amazing!'
        />
          <ProductItem
              title='Test2'
              price={7}
              description='This is a second product - amazing!'
          />
      </ul>
    </section>
  );
};

export default Products;
