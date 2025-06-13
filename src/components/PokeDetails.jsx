import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const PokeDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setLoading(true); // Se establece a true al iniciar la carga
    setError(null); // Limpiamos errores previos
    setPokemon(null); // Limpiamos datos previos

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`
      ); // Añade .toLowerCase() para nombres

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Pokémon con ID/Nombre "${id}" no encontrado.`);
        }
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }

      const data = await response.json();
      setPokemon(data);
      console.log("Datos del Pokémon obtenidos:", data); // Para depuración
    } catch (err) {
      setError(err.message || "Ocurrió un error desconocido.");
    } finally {
      setLoading(false); // Se establece a false cuando la carga finaliza (éxito o error)
    }
  };

  useEffect(() => {
    if (id) {
      fetchPokemon();
    } else {
      setError("No se encontró ID de Pokémon en la URL.");
      setLoading(false);
    }
  }, [id]); // Dependencia del ID para recargar cuando cambia

  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Cargando...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-center mt-10 text-xl text-red-500">Error: {error}</h1>
    );
  }

  if (!pokemon) {
    return (
      <h1 className="text-center mt-10 text-xl">
        No se encontraron datos del Pokémon.
      </h1>
    );
  }

  // Se extrae la URL del sprite del official-artwork.front_default
  // Se añade un fallback por si la ruta no existe o es nula
  const spriteUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default || // Fallback a la imagen frontal si no hay official-artwork
    "https://via.placeholder.com/200?text=No+Image"; // Fallback final si no hay ninguna imagen

  return (
    <>
      <Link
        className="text-center text-blue-500 justify-center items-center flex"
        to={"/."}
      >
        ---- Volver al inicio ----
      </Link>

      <section className="flex justify-center items-center p-4 min-h-screen">
        {/* Contenedor principal responsive: flex-col en móvil, flex-row en pantallas grandes */}
        <div className="w-full max-w-4xl shadow-2xl mt-10 bg-white rounded-lg flex flex-col lg:flex-row items-center lg:items-start p-4">
          {/* Contenedor de la imagen: ocupa todo el ancho en móvil, 1/2 en pantallas grandes */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center p-2">
            <img
              src={spriteUrl} // Usa la URL del sprite correctamente extraída
              alt={pokemon.name} // Alt text para accesibilidad
              className="max-h-full max-w-full object-contain" // Ajusta la imagen dentro del contenedor
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/200?text=Error+Loading+Image";
              }} // Manejo de error de carga de imagen
            />
          </div>

          <div className="flex-grow w-full lg:w-1/2 flex flex-col items-center lg:items-end lg:text-right mt-4 lg:mt-0 lg:ml-4">
            <h1 className="text-center text-2xl capitalize mt-4 font-bold text-gray-800 lg:text-3xl lg:text-right">
              {pokemon.name}
            </h1>
            <p className="text-center text-lg text-gray-600 lg:text-right">
              ID: {pokemon.id}
            </p>
            <div className="flex flex-wrap justify-center mt-4 w-full lg:justify-end">
              <h2 className="w-full text-center text-xl font-semibold mb-2 lg:text-right">
                Tipos:
              </h2>
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
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div className="flex flex-wrap justify-center mt-4 w-full lg:justify-end">
                <h2 className="w-full text-center text-xl font-semibold mb-2 lg:text-right">
                  Habilidades:
                </h2>
                {pokemon.abilities.map((abilityInfo, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mr-2 mb-2 capitalize"
                  >
                    {abilityInfo.ability.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
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
