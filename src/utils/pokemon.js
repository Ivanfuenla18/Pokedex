/** Información de los 18 tipos: etiqueta en español y colores de Tailwind. */
export const TYPE_INFO = {
  normal: { label: "Normal", color: "bg-stone-500" },
  fire: { label: "Fuego", color: "bg-orange-600" },
  water: { label: "Agua", color: "bg-blue-500" },
  electric: { label: "Eléctrico", color: "bg-amber-400" },
  grass: { label: "Planta", color: "bg-green-600" },
  ice: { label: "Hielo", color: "bg-cyan-400" },
  fighting: { label: "Lucha", color: "bg-red-700" },
  poison: { label: "Veneno", color: "bg-purple-600" },
  ground: { label: "Tierra", color: "bg-yellow-700" },
  flying: { label: "Volador", color: "bg-indigo-400" },
  psychic: { label: "Psíquico", color: "bg-pink-500" },
  bug: { label: "Bicho", color: "bg-lime-600" },
  rock: { label: "Roca", color: "bg-yellow-800" },
  ghost: { label: "Fantasma", color: "bg-violet-700" },
  dragon: { label: "Dragón", color: "bg-indigo-700" },
  dark: { label: "Siniestro", color: "bg-neutral-800" },
  steel: { label: "Acero", color: "bg-slate-500" },
  fairy: { label: "Hada", color: "bg-pink-400" },
};

export const ALL_TYPES = Object.keys(TYPE_INFO);

/** Devuelve la info de un tipo, con un valor por defecto seguro. */
export const typeInfo = (type) =>
  TYPE_INFO[type] ?? { label: type, color: "bg-slate-500" };

/** Nombre legible: "mr-mime" -> "Mr Mime". */
export const formatName = (name = "") =>
  name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

/** ID con ceros a la izquierda: 25 -> "#025". */
export const formatId = (id) => `#${String(id).padStart(3, "0")}`;

/** Etiquetas en español de las estadísticas base. */
export const STAT_LABELS = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. Especial",
  "special-defense": "Def. Especial",
  speed: "Velocidad",
};

/** Color de la barra de estadísticas según su valor (máx. conocido ~255). */
export const statColor = (value) => {
  if (value >= 120) return "bg-emerald-500";
  if (value >= 90) return "bg-lime-500";
  if (value >= 60) return "bg-amber-500";
  if (value >= 35) return "bg-orange-500";
  return "bg-red-500";
};

/** Altura: la API la da en decímetros. */
export const formatHeight = (dm) =>
  dm ? `${(dm / 10).toFixed(1).replace(".0", "")} m` : "—";

/** Peso: la API lo da en hectogramos. */
export const formatWeight = (hg) =>
  hg ? `${(hg / 10).toFixed(1).replace(".0", "")} kg` : "—";

/** Suma de las estadísticas base (poder total). */
export const totalStats = (stats = []) =>
  stats.reduce((sum, stat) => sum + stat.base_stat, 0);

/** Aplana una cadena de evolución de PokeAPI en una lista ordenada por etapas. */
export function flattenEvolutionChain(chain, result = [], stage = 0) {
  if (!chain) return result;
  const id = Number(chain.species.url.split("/").filter(Boolean).pop());
  result.push({ id, name: chain.species.name, stage });
  chain.evolves_to?.forEach((next) =>
    flattenEvolutionChain(next, result, stage + 1),
  );
  return result;
}
