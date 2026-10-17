import { useEffect, useState } from "react";
import { getPokemonIndex, loadPokemonProgressively } from "../services/pokeapi";

/**
 * Carga los 151 Pokémon de Kanto mostrándolos progresivamente,
 * aprovechando la caché para no repetir peticiones.
 */
export function usePokemonIndex(limit = 151) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const index = await getPokemonIndex(limit);
        await loadPokemonProgressively(index.results, (batch) => {
          if (active) setPokemons([...batch]);
        });
      } catch (err) {
        if (active) {
          setError(
            err?.message === "not-found"
              ? "No se encontraron datos."
              : "No se pudieron cargar los Pokémon. Inténtalo de nuevo más tarde.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [limit]);

  return { pokemons, loading, error };
}
