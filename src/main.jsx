import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layout/root.layout.jsx";
import MainLayout from "./layout/main.layout.jsx";
import Favorites from "./pages/favorites.jsx";
import MoviePage from "./pages/moviepage.jsx";
import Login from "./pages/login.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import MovieDetails from "./pages/moviedetails.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Theme.jsx";

createRoot(document.getElementById("root")).render(

  <ThemeProvider theme={theme}>
     <FavoritesProvider>
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie" element={<MoviePage />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />

        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </FavoritesProvider>
  </ThemeProvider>
  
);
