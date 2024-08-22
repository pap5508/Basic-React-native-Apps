import { useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const title = CATEGORIES.find((category) => category.id === catId).title;
    navigation.setOptions({ title: title });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}
export default MealsOverviewScreen;
