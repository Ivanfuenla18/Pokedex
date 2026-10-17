import { Link, NavLink } from "react-router-dom";
import { HeartIcon, CompareIcon, SunIcon, MoonIcon } from "./icons";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import { useTheme } from "../context/ThemeContext";

const navLinkClass = ({ isActive }) =>
  `relative rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-red-600 text-white"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;

function Badge({ value }) {
  if (!value) return null;
  return (
    <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
      {value}
    </span>
  );
}

export function Header() {
  const { count: favoritesCount } = useFavorites();
  const { count: compareCount } = useCompare();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}Pokemon.png`}
            alt="Pokédex"
            className="h-9 w-auto"
            width="100"
            height="36"
          />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            <span className="inline-flex items-center gap-1">
              <HeartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Favoritos</span>
              <Badge value={favoritesCount} />
            </span>
          </NavLink>
          <NavLink to="/compare" className={navLinkClass}>
            <span className="inline-flex items-center gap-1">
              <CompareIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Comparar</span>
              <Badge value={compareCount} />
            </span>
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            title="Cambiar tema"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
