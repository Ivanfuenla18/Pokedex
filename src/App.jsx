import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CompareBar } from "./components/CompareBar";
import PokeDetails from "./components/PokeDetails";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CompareProvider>
          <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<PokeDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <CompareBar />
            <Footer />
          </div>
        </CompareProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
