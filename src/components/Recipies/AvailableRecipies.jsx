import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableRecipies.module.css";

const AvailableRecipies = () => {
  const [recipies, setRecipies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchRecipies = async () => {
      try {
        const response = await fetch(
          "https://meal-app-e1b9b-default-rtdb.firebaseio.com/recipes.json"
        );

        console.log(response);

        if (!response.ok) {
          throw new Error(
            "Something went wrong when attempting to fetch data!"
          );
        }

        const responseData = await response.json();
        const loadedRecipies = [];

        for (const key in responseData) {
          loadedRecipies.push({
            id: key,
            name: responseData[key].name,
            ingredients: responseData[key].ingredients,
            steps: responseData[key].steps,
          });
        }

        setRecipies(loadedRecipies);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchRecipies();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.RecipiesIsLoading}>
        <p>...Loading</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.RecipiesError}>
        <p>{httpError}</p>
      </section>
    );
  }

    const recipieList = recipies.map((recipie) => (
        <li key={recipie.id}>
          <h2>{recipie.name}</h2>
          <h3>Ingredients:</h3>
          <p>{recipie.ingredients}</p>
          <h3>Instructions:</h3>
          <p>{recipie.steps}</p>
        </li>
    ));

  return (
    <section className={classes.recipies}>
      <Card>
        <ul>{recipieList}</ul>
      </Card>
    </section>
  );
};

export default AvailableRecipies;
