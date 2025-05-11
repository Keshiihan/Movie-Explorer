import React from "react";
import { Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <h1 className="text-2xl">No favorites added yet!</h1>;
  }

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {favorites.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} isFavoritePage />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favorites;