import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const getTypeColor = (type) => {
  switch (type) {
    case "normal":
      return "bg-gray-400";
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-400";
    case "ice":
      return "bg-blue-200";
    case "fighting":
      return "bg-orange-700";
    case "poison":
      return "bg-purple-600";
    case "ground":
      return "bg-yellow-700";
    case "flying":
      return "bg-indigo-400";
    case "psychic":
      return "bg-pink-500";
    case "bug":
      return "bg-green-700";
    case "rock":
      return "bg-gray-700";
    case "ghost":
      return "bg-indigo-700";
    case "dragon":
      return "bg-blue-700";
    case "steel":
      return "bg-gray-500";
    case "fairy":
      return "bg-pink-300";
    case "dark":
      return "bg-gray-800";
    case "shadow":
      return "bg-gray-900";
    case "unknown":
      return "bg-gray-300";
    default:
      return "bg-gray-300";
  }
};

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=200"
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
      <h1 className="text-4xl font-bold text-center mb-8">Pokedex Simple</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            className="block bg-white rounded-lg shadow-md p-4 text-center 
                       flex flex-col justify-between cursor-pointer 
                       transform transition-transform duration-200 ease-in-out 
                       hover:scale-105 hover:shadow-lg"
          >
            <div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto h-32 w-32 mb-4"
              />
              <p className="text-xl font-semibold capitalize mb-1">
                {pokemon.name}
              </p>
              <p className="text-gray-600 mb-2">ID: {pokemon.id}</p>{" "}
              <div className="flex justify-center gap-2 mt-2 flex-wrap">
                {" "}
                {pokemon.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`text-white text-xs font-bold px-2 py-1 rounded-full capitalize ${getTypeColor(
                      typeInfo.type.name
                    )}`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
