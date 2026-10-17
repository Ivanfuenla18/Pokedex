export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>
        Datos de{" "}
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-red-600 hover:underline dark:text-red-400"
        >
          PokéAPI
        </a>{" "}
        · Pokémon © Nintendo / Game Freak
      </p>
      <p className="mt-1">
        Hecho con 💜 por{" "}
        <a
          href="https://ivanfuenla18.github.io/Personal_Web/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-red-600 hover:underline dark:text-red-400"
        >
          Iván Paniagua Sánchez
        </a>
      </p>
    </footer>
  );
}
