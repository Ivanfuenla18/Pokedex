// src/main.jsx (o index.jsx)
import { StrictMode } from "react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/Pokedex">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
