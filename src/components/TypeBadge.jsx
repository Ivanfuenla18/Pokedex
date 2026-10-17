import { typeInfo } from "../utils/pokemon";

const SIZES = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function TypeBadge({ type, size = "sm" }) {
  const info = typeInfo(type);
  return (
    <span
      className={`${info.color} ${SIZES[size]} inline-flex items-center rounded-full font-semibold tracking-wide text-white capitalize shadow-sm`}
    >
      {info.label}
    </span>
  );
}
