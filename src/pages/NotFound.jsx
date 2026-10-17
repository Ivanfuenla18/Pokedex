import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../components/icons";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-black text-red-600 dark:text-red-500">404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
        ¡Un Pokémon salvaje apareció… pero no era este!
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        La página que buscas no existe o se ha movido.
      </p>
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

export default NotFound;
