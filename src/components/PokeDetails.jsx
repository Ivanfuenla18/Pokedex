import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemon, getSpecies, getEvolutionChain } from "../services/pokeapi";
import { TypeBadge } from "./TypeBadge";
import { DetailSkeleton } from "./Skeleton";
import {
  HeartIcon,
  CompareIcon,
  ArrowLeftIcon,
  RulerIcon,
  WeightIcon,
} from "./icons";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import {
  STAT_LABELS,
  formatHeight,
  formatWeight,
  formatId,
  totalStats,
  statColor,
  flattenEvolutionChain,
  formatName,
} from "../utils/pokemon";

const MAX_ID = 151;
const STAT_ORDER = Object.keys(STAT_LABELS);

const cleanText = (text = "") =>
  text.replace(/[\n\f\r]/g, " ").replace(/\s+/g, " ").trim();

const pickFlavor = (species, language) =>
  species?.flavor_text_entries?.find(
    (entry) => entry.language.name === language,
  )?.flavor_text;

function PokeDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare } = useCompare();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setPokemon(null);
    setSpecies(null);
    setEvolution([]);

    (async () => {
      try {
        const data = await getPokemon(id);
        if (!active) return;
        setPokemon(data);

        try {
          const speciesData = await getSpecies(data.id);
          if (!active) return;
          setSpecies(speciesData);

          if (speciesData.evolution_chain?.url) {
            const chain = await getEvolutionChain(
              speciesData.evolution_chain.url,
            );
            const flat = flattenEvolutionChain(chain.chain);
            const withSprites = await Promise.all(
              flat.map(async (evo) => {
                try {
                  const evoData = await getPokemon(evo.id);
                  return { ...evo, sprite: evoData.sprites?.front_default };
                } catch {
                  return evo;
                }
              }),
            );
            if (active) setEvolution(withSprites);
          }
        } catch {
          /* la ficha sigue siendo válida aunque falle la especie */
        }
      } catch (err) {
        if (active) {
          setError(
            err?.status === 404
              ? `No existe ningún Pokémon con «${id}».`
              : "No se pudieron cargar los datos. Inténtalo de nuevo.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6">
        <DetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          {error}
        </h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Volver a la Pokédex
        </Link>
      </div>
    );
  }

  if (!pokemon) return null;

  const artwork =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;
  const genus =
    species?.genera?.find((entry) => entry.language.name === "es")?.genus || "";
  const flavor =
    cleanText(pickFlavor(species, "es")) ||
    cleanText(pickFlavor(species, "en"));
  const favorite = isFavorite(pokemon.id);
  const comparing = isComparing(pokemon.id);
  const total = totalStats(pokemon.stats);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600 dark:text-slate-400"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a la Pokédex
        </Link>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(pokemon.id)}
            aria-pressed={favorite}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              favorite
                ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                : "border-slate-200 text-slate-600 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <HeartIcon filled={favorite} className="h-4 w-4" />
            {favorite ? "En favoritos" : "Favorito"}
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(pokemon.id)}
            aria-pressed={comparing}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              comparing
                ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400"
                : "border-slate-200 text-slate-600 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <CompareIcon className="h-4 w-4" />
            Comparar
          </button>
        </div>
      </div>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-slate-100 p-4 dark:from-slate-800 dark:to-slate-900">
            <img
              src={artwork}
              alt={pokemon.name}
              width="256"
              height="256"
              className="h-56 w-56 object-contain drop-shadow-xl"
            />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-400">
              {formatId(pokemon.id)}
            </p>
            <h1 className="text-3xl font-black capitalize text-slate-900 dark:text-white">
              {pokemon.name}
            </h1>
            {genus && (
              <p className="mt-1 text-sm font-medium capitalize text-slate-500 dark:text-slate-400">
                {genus}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {pokemon.types.map(({ type }) => (
                <TypeBadge key={type.name} type={type.name} size="md" />
              ))}
            </div>

            {flavor && (
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {flavor}
              </p>
            )}

            <dl className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60">
                <dt className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <RulerIcon className="h-4 w-4" />
                  Altura
                </dt>
                <dd className="mt-1 font-bold text-slate-800 dark:text-slate-100">
                  {formatHeight(pokemon.height)}
                </dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60">
                <dt className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <WeightIcon className="h-4 w-4" />
                  Peso
                </dt>
                <dd className="mt-1 font-bold text-slate-800 dark:text-slate-100">
                  {formatWeight(pokemon.weight)}
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Habilidades
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <span
                    key={ability.name}
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      is_hidden
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {ability.name.replace(/-/g, " ")}
                    {is_hidden && " (oculta)"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-6 dark:border-slate-700">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Estadísticas base
          </h2>
          <div className="space-y-3">
            {STAT_ORDER.map((statName) => {
              const stat = pokemon.stats.find(
                (entry) => entry.stat.name === statName,
              );
              const value = stat?.base_stat ?? 0;
              return (
                <div key={statName} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {STAT_LABELS[statName]}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full ${statColor(value)}`}
                      style={{ width: `${Math.min(value / 1.5, 100)}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-bold text-slate-700 dark:text-slate-200">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-right font-bold text-slate-700 dark:text-slate-200">
            Poder total:{" "}
            <span className="text-red-600 dark:text-red-400">{total}</span>
          </p>
        </div>

        {evolution.length > 1 && (
          <div className="border-t border-slate-200 p-6 dark:border-slate-700">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
              Línea evolutiva
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {evolution.map((evo, index) => (
                <div key={evo.id} className="flex items-center gap-4">
                  {index > 0 && (
                    <span className="text-2xl text-slate-300 dark:text-slate-600">
                      →
                    </span>
                  )}
                  <Link
                    to={`/pokemon/${evo.id}`}
                    className={`flex flex-col items-center rounded-2xl border p-3 transition hover:-translate-y-0.5 hover:shadow-md ${
                      evo.id === pokemon.id
                        ? "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-950/30"
                        : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                    }`}
                  >
                    {evo.sprite && (
                      <img
                        src={evo.sprite}
                        alt={evo.name}
                        width="72"
                        height="72"
                        loading="lazy"
                        className="h-16 w-16 object-contain"
                      />
                    )}
                    <span className="text-xs font-semibold capitalize text-slate-600 dark:text-slate-300">
                      {formatName(evo.name)}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      <nav className="mt-6 flex items-center justify-between gap-2 pb-24">
        {pokemon.id > 1 ? (
          <Link
            to={`/pokemon/${pokemon.id - 1}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {formatId(pokemon.id - 1)}
          </Link>
        ) : (
          <span />
        )}
        {pokemon.id < MAX_ID ? (
          <Link
            to={`/pokemon/${pokemon.id + 1}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"
          >
            {formatId(pokemon.id + 1)}
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

export default PokeDetails;
