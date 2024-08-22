import { View, Text, StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavouritesScreen() {
  //  const favMealsCtx = useContext(FavouritesContext);
  const favMealIds = useSelector((state) => state.favouritMeals.ids);
  const favoritesMeals = MEALS.filter((meal) => favMealIds.includes(meal.id));
  if (favoritesMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favourites meals yet.</Text>
      </View>
    );
  }
  return <MealsList items={favoritesMeals} />;
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
