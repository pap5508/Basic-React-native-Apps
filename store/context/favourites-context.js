import { createContext, useState } from "react";
export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

function FavouritesContextProvider({ children }) {
  const [favouritesMealIds, setFavouritesMealIds] = useState([]);

  function addFavourite(id) {
    setFavouritesMealIds((currentFavIDs) => [...currentFavIDs, id]);
  }

  function removeFavourite(id) {
    setFavouritesMealIds((currentFavIDs) =>
      currentFavIDs.filter((mealId) => mealId !== id)
    );
  }

  const value = {
    ids: favouritesMealIds,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;
