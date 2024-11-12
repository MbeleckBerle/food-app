import { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = [
    "a9beec4fb3fb44ad8d4118e98c4fbc11",
    "1a47dee7c69a4ef8ba54655c0efa42c3",
  ];

  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY[1]}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}> {food.title} </h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏰{food.readyInMinutes}</strong>
          </span>
          <span>👩‍👧‍👦Serves {food.servings}</span>
          <span>
            <strong>{food.vegan ? "🐮Vegan" : ""}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕Vegetarian" : "🥩Non-Vegitarian"}{" "}
            </strong>
          </span>
        </div>
        <div>
          <span>
            <strong>💲{food.pricePerServing / 100}</strong>
          </span>
        </div>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ItemList isLoading={isLoading} food={food} />

        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
