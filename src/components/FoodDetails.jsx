import { useEffect, useState } from "react";

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
      <div>
        <h1> {food.title} </h1>
        <img src={food.image} alt="" />
        <div>
          <span>
            <strong>⏰{food.readyInMinutes}</strong>
          </span>
          <span>👩‍👧‍👦Serves {food.servings}</span>
          <span>{food.vegan ? "🐮Vegan" : ""}</span>
          <span>{food.vegetarian ? "🥕Vegetarian" : "🥩Non-Vegitarian"} </span>
        </div>
        <div>
          <span>💲{food.pricePerServing / 100}</span>
        </div>
      </div>
      <div>
        <h2>Instructions</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          food.analyzedInstructions[0].steps.map((step) => <li>{step.step}</li>)
        )}
      </div>
    </div>
  );
}
