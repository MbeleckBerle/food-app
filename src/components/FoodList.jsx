import FoodItem from "./FoodItem";
import styles from "./foodlist.module.css";
export default function FoodList({ foodData, setFoodId }) {
  return (
    <div className={styles.itemContainer}>
      {foodData.map((food) => (
        <FoodItem setFoodId={setFoodId} key={food.id} food={food} />
      ))}
    </div>
  );
}
