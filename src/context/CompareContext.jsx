/* eslint-disable react-refresh/only-export-components -- co-localizamos el
   provider con su hook, patrón habitual y recomendado en React. */
import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CompareContext = createContext(null);
const STORAGE_KEY = "pokedex-compare";
export const MAX_COMPARE = 2;

export function CompareProvider({ children }) {
  const [compare, setCompare] = useLocalStorage(STORAGE_KEY, []);

  const isComparing = useCallback(
    (id) => compare.includes(Number(id)),
    [compare],
  );

  /** Añade o quita un Pokémon. Si ya hay 2, sustituye al más antiguo. */
  const toggleCompare = useCallback(
    (id) => {
      const numericId = Number(id);
      setCompare((list) => {
        if (list.includes(numericId)) {
          return list.filter((item) => item !== numericId);
        }
        if (list.length >= MAX_COMPARE) {
          return [...list.slice(1), numericId];
        }
        return [...list, numericId];
      });
    },
    [setCompare],
  );

  const clearCompare = useCallback(() => setCompare([]), [setCompare]);

  const value = useMemo(
    () => ({
      compare,
      count: compare.length,
      isComparing,
      toggleCompare,
      clearCompare,
    }),
    [compare, isComparing, toggleCompare, clearCompare],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare debe usarse dentro de CompareProvider");
  }
  return context;
}
