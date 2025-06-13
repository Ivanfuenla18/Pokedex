import React from "react";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { PokeDetails } from "./components/PokeDetails";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokeDetails />} />
      </Routes>
    </>
  );
}

export default App;
