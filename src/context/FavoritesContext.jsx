/* eslint-disable react-refresh/only-export-components -- co-localizamos el
   provider con su hook, patrón habitual y recomendado en React. */
import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "pokedex-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEY, []);

  const isFavorite = useCallback(
    (id) => favorites.includes(Number(id)),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (id) => {
      const numericId = Number(id);
      setFavorites((list) =>
        list.includes(numericId)
          ? list.filter((item) => item !== numericId)
          : [...list, numericId],
      );
    },
    [setFavorites],
  );

  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites]);

  const value = useMemo(
    () => ({
      favorites,
      count: favorites.length,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
  return context;
}
