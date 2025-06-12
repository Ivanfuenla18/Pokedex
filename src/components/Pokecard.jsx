import React from "react";
import { Link } from "react-router-dom";

export const Pokecard = ({ pokemons }) => {
  console.log(pokemons);
  return (
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
            <p className="text-gray-600 mb-2">ID: {pokemon.id}</p>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
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
  );
};

const getTypeColor = (type) => {
  switch (type) {
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-500";
    case "psychic":
      return "bg-pink-500";
    case "ice":
      return "bg-blue-300";
    case "dragon":
      return "bg-indigo-700";
    case "dark":
      return "bg-gray-800";
    case "fairy":
      return "bg-pink-300";
    case "normal":
      return "bg-gray-400";
    case "fighting":
      return "bg-orange-700";
    case "flying":
      return "bg-indigo-300";
    case "poison":
      return "bg-purple-600";
    case "ground":
      return "bg-yellow-800";
    case "rock":
      return "bg-gray-700";
    case "bug":
      return "bg-green-700";
    case "ghost":
      return "bg-purple-900";
    case "steel":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};
