import { SearchIcon, CloseIcon } from "./icons";
import { ALL_TYPES, typeInfo } from "../utils/pokemon";

const SORT_OPTIONS = [
  { value: "id", label: "Nº Pokédex" },
  { value: "name-asc", label: "Nombre (A-Z)" },
  { value: "name-desc", label: "Nombre (Z-A)" },
  { value: "total-desc", label: "Más poderosos" },
];

export function PokemonToolbar({
  search,
  onSearch,
  selectedType,
  onTypeChange,
  sort,
  onSortChange,
  shown,
  total,
}) {
  return (
    <section className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Buscar por nombre o número…"
            aria-label="Buscar Pokémon"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch("")}
              aria-label="Borrar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Ordenar por"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onTypeChange("")}
          aria-pressed={selectedType === ""}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            selectedType === ""
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          Todos
        </button>
        {ALL_TYPES.map((type) => {
          const active = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onTypeChange(active ? "" : type)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize text-white transition ${
                typeInfo(type).color
              } ${active ? "ring-2 ring-slate-900 ring-offset-2 dark:ring-white dark:ring-offset-slate-900" : "opacity-80 hover:opacity-100"}`}
            >
              {typeInfo(type).label}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        {shown} de {total} Pokémon
      </p>
    </section>
  );
}
