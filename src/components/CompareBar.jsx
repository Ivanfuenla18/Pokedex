import { Link } from "react-router-dom";
import { useCompare, MAX_COMPARE } from "../context/CompareContext";
import { usePokemonByIds } from "../hooks/usePokemonByIds";
import { CloseIcon } from "./icons";

export function CompareBar() {
  const { compare, count, toggleCompare, clearCompare } = useCompare();
  const { pokemons } = usePokemonByIds(compare);

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-slide-up border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Comparar ({count}/{MAX_COMPARE}):
          </span>
          <div className="flex items-center gap-2">
            {pokemons.map((pokemon) => (
              <span
                key={pokemon.id}
                className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1 pr-2 dark:border-slate-700 dark:bg-slate-800"
              >
                <img
                  src={pokemon.sprites?.front_default}
                  alt={pokemon.name}
                  className="h-8 w-8 object-contain"
                  width="32"
                  height="32"
                />
                <span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
                  {pokemon.name}
                </span>
                <button
                  type="button"
                  onClick={() => toggleCompare(pokemon.id)}
                  aria-label={`Quitar ${pokemon.name} del comparador`}
                  className="text-slate-400 transition hover:text-red-500"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Vaciar
          </button>
          {count === MAX_COMPARE ? (
            <Link
              to="/compare"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Comparar ahora
            </Link>
          ) : (
            <span className="text-sm text-slate-400">
              Elige otro Pokémon para comparar
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
