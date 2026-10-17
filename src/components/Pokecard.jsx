import { Link } from "react-router-dom";
import { TypeBadge } from "./TypeBadge";
import { HeartIcon, CompareIcon } from "./icons";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import { formatId } from "../utils/pokemon";

export function Pokecard({ pokemon }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare } = useCompare();

  const favorite = isFavorite(pokemon.id);
  const comparing = isComparing(pokemon.id);

  const actionClass =
    "flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/60">
      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
        <button
          type="button"
          onClick={() => toggleFavorite(pokemon.id)}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Quitar ${pokemon.name} de favoritos`
              : `Añadir ${pokemon.name} a favoritos`
          }
          title={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          className={`${actionClass} ${
            favorite
              ? "border-red-500 bg-red-500/10 text-red-500"
              : "border-slate-200 bg-white/70 text-slate-400 hover:text-red-500 dark:border-slate-600 dark:bg-slate-800/70"
          }`}
        >
          <HeartIcon filled={favorite} className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => toggleCompare(pokemon.id)}
          aria-pressed={comparing}
          aria-label={
            comparing
              ? `Quitar ${pokemon.name} del comparador`
              : `Comparar ${pokemon.name}`
          }
          title={comparing ? "Quitar del comparador" : "Añadir al comparador"}
          className={`${actionClass} ${
            comparing
              ? "border-sky-500 bg-sky-500/10 text-sky-500"
              : "border-slate-200 bg-white/70 text-slate-400 hover:text-sky-500 dark:border-slate-600 dark:bg-slate-800/70"
          }`}
        >
          <CompareIcon className="h-4 w-4" />
        </button>
      </div>

      <Link
        to={`/pokemon/${pokemon.id}`}
        className="block text-center focus:outline-none"
        aria-label={`Ver detalles de ${pokemon.name}`}
      >
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          width="112"
          height="112"
          loading="lazy"
          className="mx-auto h-28 w-28 object-contain transition duration-300 group-hover:scale-110"
        />
        <p className="mt-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
          {formatId(pokemon.id)}
        </p>
        <h3 className="text-base font-bold capitalize text-slate-800 dark:text-slate-100">
          {pokemon.name}
        </h3>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {pokemon.types.map(({ type }) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </div>
      </Link>
    </article>
  );
}
