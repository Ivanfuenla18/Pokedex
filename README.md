# Pokédex Interactiva

Pokédex de la región de **Kanto** construida con **React + Vite + Tailwind CSS**, con datos en vivo de [PokéAPI](https://pokeapi.co/).

[![Demo](https://img.shields.io/badge/demo-en%20vivo-dc2626?style=for-the-badge&logo=pokemon&logoColor=white)](https://ivanfuenla18.github.io/Pokedex/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Características

- **Buscador** por nombre o número de Pokédex.
- **Filtro por tipo** (los 18 tipos, con sus colores oficiales).
- **Ordenación** por número, nombre o poder total.
- **Ficha de detalle** con descripción, altura, peso, habilidades, estadísticas base y **línea evolutiva** navegable.
- **Favoritos** guardados en el navegador (localStorage).
- **Comparador** cara a cara de dos Pokémon, resaltando el mejor valor de cada estadística.
- **Modo claro y oscuro** con preferencia guardada.
- **Carga progresiva** de los 151 Pokémon con esqueletos de carga.
- **Caché** de las respuestas de la API (memoria + sessionStorage) para no repetir peticiones.
- **Página 404** propia y manejo de Pokémon inexistentes.
- **Diseño responsive** y accesible (aria-labels, foco visible, navegación por teclado).

## 🧱 Stack

| Área | Tecnología |
| --- | --- |
| UI | React 19 |
| Build | Vite 6 |
| Estilos | Tailwind CSS 4 |
| Rutas | React Router 7 (`HashRouter`) |
| Datos | PokéAPI (REST) |
| Linting | ESLint 9 |
| Deploy | gh-pages → GitHub Pages |

## 📂 Estructura

```text
src/
├── components/     # Header, Footer, Pokecard, PokeDetails, toolbar, comparador…
├── context/        # Tema, favoritos y comparador (React Context + localStorage)
├── hooks/          # usePokemonIndex, usePokemonByIds, useLocalStorage
├── pages/          # Home, Favorites, Compare, NotFound
├── services/       # Cliente de PokéAPI con caché
├── utils/          # Tipos, etiquetas y formateadores
├── App.jsx         # Rutas y providers
└── main.jsx        # Punto de entrada
```

## 🚀 Puesta en marcha

Requisitos: **Node.js 20+** y **npm**.

```bash
git clone https://github.com/Ivanfuenla18/Pokedex.git
cd Pokedex
npm install
npm run dev
```

Disponible en `http://localhost:5173/Pokedex/`.

## 📜 Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualiza la build |
| `npm run lint` | Analiza el código con ESLint |
| `npm run deploy` | Compila y publica en la rama `gh-pages` |

> **Nota:** se usa `HashRouter` a propósito, para que recargar la página o abrir un enlace directo a un Pokémon no devuelva un 404 en GitHub Pages.

## 🙏 Créditos

- Datos e imágenes: [PokéAPI](https://pokeapi.co/)
- Pokémon © Nintendo / Game Freak

---

<p align="center">Hecho con 💜 por <strong>Iván Paniagua Sánchez</strong></p>
