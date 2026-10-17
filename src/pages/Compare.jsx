import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { usePokemonByIds } from "../hooks/usePokemonByIds";
import { TypeBadge } from "../components/TypeBadge";
import { DetailSkeleton } from "../components/Skeleton";
import { CompareIcon, CloseIcon, ArrowLeftIcon } from "../components/icons";
import {
  STAT_LABELS,
  formatHeight,
  formatWeight,
  formatId,
  totalStats,
  statColor,
} from "../utils/pokemon";

const STAT_ORDER = Object.keys(STAT_LABELS);

function Compare() {
  const { compare, count, toggleCompare, clearCompare } = useCompare();
  const { pokemons, loading } = usePokemonByIds(compare);

  if (count < 2) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <CompareIcon className="h-14 w-14 text-sky-500" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          Comparador de Pokémon
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Selecciona {2 - count} Pokémon más con el botón de comparar para ver
          sus estadísticas cara a cara.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Elegir Pokémon
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Comparativa
        </h1>
        <button
          type="button"
          onClick={clearCompare}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"
        >
          Vaciar comparador
        </button>
      </div>

      {loading ? (
        <DetailSkeleton />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className="relative p-4 text-center">
                <button
                  type="button"
                  onClick={() => toggleCompare(pokemon.id)}
                  aria-label={`Quitar ${pokemon.name} del comparador`}
                  className="absolute right-2 top-2 text-slate-400 transition hover:text-red-500"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
                <Link to={`/pokemon/${pokemon.id}`} className="block">
                  <img
                    src={
                      pokemon.sprites?.other?.["official-artwork"]
                        ?.front_default || pokemon.sprites?.front_default
                    }
                    alt={pokemon.name}
                    width="140"
                    height="140"
                    className="mx-auto h-32 w-32 object-contain"
                  />
                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {formatId(pokemon.id)}
                  </p>
                  <h2 className="text-xl font-bold capitalize text-slate-900 dark:text-white">
                    {pokemon.name}
                  </h2>
                </Link>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {pokemon.types.map(({ type }) => (
                    <TypeBadge key={type.name} type={type.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <table className="w-full border-t border-slate-200 text-sm dark:border-slate-700">
            <tbody>
              <Row
                label="Altura"
                values={pokemons.map((p) => formatHeight(p.height))}
              />
              <Row
                label="Peso"
                values={pokemons.map((p) => formatWeight(p.weight))}
              />
              <Row
                label="Habilidades"
                values={pokemons.map((p) =>
                  p.abilities
                    .map((a) => a.ability.name.replace(/-/g, " "))
                    .join(", "),
                )}
                capitalize
              />
            </tbody>
          </table>

          <div className="border-t border-slate-200 p-4 dark:border-slate-700">
            <h3 className="mb-3 font-bold text-slate-800 dark:text-slate-100">
              Estadísticas base
            </h3>
            <div className="space-y-3">
              {STAT_ORDER.map((statName) => {
                const values = pokemons.map(
                  (p) =>
                    p.stats.find((s) => s.stat.name === statName)?.base_stat ?? 0,
                );
                const best = Math.max(...values);
                return (
                  <div key={statName}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {STAT_LABELS[statName]}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {values.map((value, index) => (
                        <div
                          key={pokemons[index].id}
                          className="flex items-center gap-2"
                        >
                          <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className={`h-full rounded-full ${statColor(value)}`}
                              style={{
                                width: `${Math.min(value / 1.5, 100)}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`w-8 text-right font-bold ${
                              value === best
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
              {pokemons.map((pokemon) => {
                const total = totalStats(pokemon.stats);
                const best = Math.max(...pokemons.map((p) => totalStats(p.stats)));
                return (
                  <div key={pokemon.id} className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Poder total
                    </p>
                    <p
                      className={`text-2xl font-black ${
                        total === best
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {total}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, values, capitalize = false }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 dark:border-slate-700/50">
      <th className="w-1/3 px-4 py-2 text-left font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </th>
      {values.map((value, index) => (
        <td
          key={index}
          className={`px-4 py-2 text-center text-slate-700 dark:text-slate-200 ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

export default Compare;
