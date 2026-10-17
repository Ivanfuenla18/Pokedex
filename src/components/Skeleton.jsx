/** Esqueletos de carga para dar sensación de velocidad. */

export function PokecardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="mx-auto my-2 h-28 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="mx-auto mt-3 h-3 w-12 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mx-auto mt-2 h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-3 flex justify-center gap-2">
        <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <PokecardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
