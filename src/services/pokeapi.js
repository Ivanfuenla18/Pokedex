/**
 * Capa de acceso a PokeAPI con caché en memoria y en sessionStorage
 * para no repetir peticiones entre navegaciones.
 */
const API = "https://pokeapi.co/api/v2";
const CACHE_PREFIX = "pokedex-cache:";

const memory = new Map();

function readSession(url) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + url);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(url, data) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + url, JSON.stringify(data));
  } catch {
    /* sessionStorage lleno o no disponible: la caché en memoria basta */
  }
}

async function cachedFetch(url, { signal } = {}) {
  if (memory.has(url)) return memory.get(url);

  const stored = readSession(url);
  if (stored) {
    memory.set(url, stored);
    return stored;
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    if (response.status === 404) {
      const error = new Error("not-found");
      error.status = 404;
      throw error;
    }
    throw new Error(`Error HTTP ${response.status}`);
  }

  const data = await response.json();
  memory.set(url, data);
  writeSession(url, data);
  return data;
}

/** Lista de los primeros `limit` Pokémon (por defecto, los 151 de Kanto). */
export const getPokemonIndex = (limit = 151) =>
  cachedFetch(`${API}/pokemon?limit=${limit}`);

/** Datos completos de un Pokémon por id o nombre. */
export const getPokemon = (idOrName) =>
  cachedFetch(`${API}/pokemon/${String(idOrName).toLowerCase()}`);

/** Datos de especie (descripción, cadena evolutiva...). */
export const getSpecies = (id) => cachedFetch(`${API}/pokemon-species/${id}`);

/** Cadena evolutiva a partir de su URL. */
export const getEvolutionChain = (url) => cachedFetch(url);

/**
 * Carga los detalles de una lista de Pokémon por lotes y avisa conforme llegan,
 * para mostrar las tarjetas progresivamente en lugar de esperar a todas.
 */
export async function loadPokemonProgressively(entries, onBatch, batchSize = 12) {
  const loaded = [];
  for (let i = 0; i < entries.length; i += batchSize) {
    const slice = entries.slice(i, i + batchSize);
    const batch = await Promise.all(
      slice.map((entry) => getPokemon(entry.name).catch(() => null)),
    );
    const valid = batch.filter(Boolean);
    loaded.push(...valid);
    onBatch(loaded);
  }
  return loaded;
}

/** Extrae el id numérico de una URL de PokeAPI. */
export const idFromUrl = (url) => Number(url.split("/").filter(Boolean).pop());
