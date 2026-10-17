import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { usePokemonByIds } from "../hooks/usePokemonByIds";
import { Pokecard } from "../components/Pokecard";
import { GridSkeleton } from "../components/Skeleton";
import { HeartIcon, TrashIcon } from "../components/icons";

function Favorites() {
  const { favorites, count, clearFavorites } = useFavorites();
  const { pokemons, loading } = usePokemonByIds(favorites);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold text-slate-900 dark:text-white">
          <HeartIcon filled className="h-7 w-7 text-red-500" />
          Favoritos
        </h1>

        {count > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"
          >
            <TrashIcon className="h-4 w-4" />
            Vaciar lista
          </button>
        )}
      </div>

      {count === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Todavía no tienes favoritos
          </p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Pulsa el corazón de cualquier Pokémon para guardarlo aquí.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Explorar la Pokédex
          </Link>
        </div>
      )}

      {loading && <GridSkeleton count={4} />}

      {!loading && pokemons.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pb-24 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {pokemons.map((pokemon) => (
            <Pokecard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
