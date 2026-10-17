import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";

/** Carga los Pokémon indicados (favoritos / comparador). */
export function usePokemonByIds(ids) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(ids.length > 0);
  const key = ids.join(",");

  useEffect(() => {
    let active = true;
    const list = key ? key.split(",").map(Number) : [];

    if (list.length === 0) {
      setPokemons([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    Promise.all(list.map((id) => getPokemon(id).catch(() => null)))
      .then((items) => {
        if (active) setPokemons(items.filter(Boolean));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [key]);

  return { pokemons, loading };
}
