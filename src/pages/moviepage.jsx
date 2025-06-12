import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Grid, Button, Box } from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum = 1, append = false) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: "en-US",
            page: pageNum,
          },
        }
      );
      if (append) {
        setMovies((prev) => [...prev, ...response.data.results]);
      } else {
        setMovies(response.data.results);
      }
      setHasMore(pageNum < response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, false);
  }, []);

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, true);
  };

  if (loading && movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={5} sx={{ padding: 2 }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <Box className="flex justify-center my-8">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              borderRadius: 8,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              boxShadow: 4,
              letterSpacing: 1,
              transition: "background 0.3s, transform 0.2s",
              background: "linear-gradient(90deg, #a989ea 0%, #1f5de2 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #1f5de2 0%, #a989ea 100%)",
                transform: "scale(1.05)",
                boxShadow: 8,
              },
            }}
            onClick={handleViewMore}
          >
            View More
          </Button>
        </Box>
      )}
    </>
  );
};

export default MovieList;