import { useMemo, useState } from "react";
import { usePokemonIndex } from "../hooks/usePokemonIndex";
import { PokemonToolbar } from "../components/PokemonToolbar";
import { Pokecard } from "../components/Pokecard";
import { GridSkeleton } from "../components/Skeleton";
import { totalStats } from "../utils/pokemon";

function Home() {
  const { pokemons, loading, error } = usePokemonIndex(151);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sort, setSort] = useState("id");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = pokemons;
    if (term) {
      list = list.filter(
        (pokemon) =>
          pokemon.name.includes(term) ||
          String(pokemon.id) === term ||
          String(pokemon.id).padStart(3, "0").includes(term),
      );
    }
    if (selectedType) {
      list = list.filter((pokemon) =>
        pokemon.types.some(({ type }) => type.name === selectedType),
      );
    }

    const sorted = [...list];
    switch (sort) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "total-desc":
        sorted.sort((a, b) => totalStats(b.stats) - totalStats(a.stats));
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
    }
    return sorted;
  }, [pokemons, search, selectedType, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Pokédex de <span className="text-red-600 dark:text-red-500">Kanto</span>
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Busca, filtra por tipo, marca tus favoritos y compáralos.
        </p>
      </div>

      <PokemonToolbar
        search={search}
        onSearch={setSearch}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        sort={sort}
        onSortChange={setSort}
        shown={filtered.length}
        total={pokemons.length}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {!error && loading && pokemons.length === 0 && <GridSkeleton count={12} />}

      {!error && !loading && filtered.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            No se encontró ningún Pokémon
          </p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Prueba con otro nombre o cambia el filtro de tipo.
          </p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pb-24 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((pokemon) => (
            <Pokecard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      {loading && pokemons.length > 0 && (
        <p className="pb-24 text-center text-sm text-slate-400">
          Cargando Pokémon… {pokemons.length}/151
        </p>
      )}
    </div>
  );
}

export default Home;
