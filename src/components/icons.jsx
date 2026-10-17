/** Iconos SVG ligeros (sin dependencias externas). */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const HeartIcon = ({ filled, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    {...base}
    fill={filled ? "currentColor" : "none"}
    {...props}
  >
    <path d="M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.5 12 20 12 20Z" />
  </svg>
);

export const CompareIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M4 7h10M4 7l3-3M4 7l3 3" />
    <path d="M20 17H10M20 17l-3-3M20 17l-3 3" />
  </svg>
);

export const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowLeftIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M19 12H5M5 12l6-6M5 12l6 6" />
  </svg>
);

export const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" />
  </svg>
);

export const RulerIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" />
  </svg>
);

export const WeightIcon = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M7 8h10l2 12H5L7 8Z" />
    <path d="M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </svg>
);
