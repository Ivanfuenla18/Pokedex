import React, { useState, useEffect } from "react";
import { Pokecard } from "./Pokecard";

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Este useEffect se encarga de recoger los pokemons y hacer otro fetch para los datos */

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return details;
          })
        );

        setPokemons(pokemonDetails);
      } catch (e) {
        console.error("Error al obtener los Pokémon:", e);
        setError(
          "No se pudieron cargar los Pokémon. Intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-xl">Cargando Pokémon...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8  ">
        POKEDEX SIMPLE KANTO
      </h1>
      <Pokecard pokemons={pokemons}></Pokecard>
    </div>
  );
};
