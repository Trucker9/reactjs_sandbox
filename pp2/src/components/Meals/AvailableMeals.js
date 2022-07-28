import Card from '../UI/Card';
import MealItem from './Meal Items/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // function passed to useEffect runs once when component is rendered,  then changes the state,
  // so component re renders with new data from server.
  useEffect(() => {

    setLoading(true);

    // we can't return promise from the function passed to useEffect.
    const fetchMeals = async () => {
    const response = await fetch('https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/Meals.json');
   
    if(!response.ok) throw new Error('Something went wrong!');
    const responseData = await response.json();
    setMeals(responseData);
    setLoading(false);
    }

    
    // try {
    // // if we want to catch the error, we should await the promise. but we use alternative solution to do it.
    //   fetchMeals();
    // } catch (error) {
    //  setLoading(false);
    //   setErr(error);
    // }

    fetchMeals().catch(error => {
      setLoading(false);
      setErr(error);
    });




  }, []);

  // LOADING 
  if(loading) {
    return(
      <section className={classes["meal-loading"]}>
        <h3> Loading . . . </h3>
      </section>
    )
  }

  // ERROR
  if(err) {
    return(
      <section className={classes["meal-err"]}>
        <h3> {err.message} </h3>
      </section>
    )
  }


  // pushing server data to array
  const loadedMeals = [];
  for(let key in meals){
    loadedMeals.push({
      id: key,
      name: meals[key].name,
      description: meals[key].description,
      price: meals[key].price,
    });
  }


  // creating JSX content for each meal
  const formattedMeals = loadedMeals.map((el) => {
    return (
      <MealItem
        key={el.id}
        name={el.name}
        description={el.description}
        price={el.price}
        id={el.id}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{formattedMeals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
