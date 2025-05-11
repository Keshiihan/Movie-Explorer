import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Button,
  Chip,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
            },
          }
        );

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
            },
          }
        );

        setMovie(movieResponse.data);
        setCast(castResponse.data.cast.slice(0, 5)); // Limit to top 5 cast members
        const trailerData = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(
          trailerData
            ? `https://www.youtube.com/watch?v=${trailerData.key}`
            : null
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" style={{ color: theme.palette.text.main }}>
          Movie not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        className="mb-4"
        startIcon={<ArrowBackIcon />}
        style={{
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        }}
      >
        Back
      </Button>

      <Grid
        container
        spacing={4}
        className="relative bg-white shadow-lg rounded-lg p-6"
      >
        {/* Background Poster */}
        <Box
          className="absolute inset-0 z-0"
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            opacity: 1,
            filter: "blur(3px)",
          }}
        ></Box>

        {/* Movie Poster */}
        <Grid item xs={12} md={4} className="relative z-10">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-2xl shadow-2xl" // Added rounded-2xl for border radius and shadow-2xl for box shadow
          />
        </Grid>

        {/* Movie Details */}
        <Grid
          item
          xs={12}
          md={8}
          className="relative z-10 flex flex-col justify-between"
        >
          <Box>
            <Typography
              variant="h4"
              className="font-bold mb-4"
              style={{ color: "#ffffff" }}
            >
              {movie.title}
            </Typography>
            <Typography
              variant="body1"
              className="mb-4"
              style={{ color: "#ffffff" }}
            >
              {movie.overview}
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              style={{ color: "#ffffff" }}
            >
              <strong style={{ color: theme.palette.secondary.main }}>
                Release Date:
              </strong>{" "}
              {movie.release_date}
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              style={{ color: "#ffffff" }}
            >
              <strong style={{ color: theme.palette.secondary.main }}>
                Language:
              </strong>{" "}
              {movie.original_language.toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              className="mb-2"
              style={{ color: "#ffffff" }}
            >
              <strong style={{ color: theme.palette.secondary.main }}>
                Rating:
              </strong>{" "}
              {movie.vote_average} / 10
            </Typography>
            <Typography
              variant="body2"
              className="mb-4"
              style={{ color: "#ffffff" }}
            >
              <strong style={{ color: theme.palette.secondary.main }}>
                Genres:
              </strong>{" "}
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  className="mr-2 mb-2"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.main,
                  }}
                />
              ))}
            </Typography>
          </Box>

          {/* Trailer */}
          {trailer && (
            <Button
              variant="contained"
              href={trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.main,
              }}
            >
              Watch Trailer
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Cast Section */}
      <Box className="mt-6">
        <Typography
          variant="h6"
          className="font-bold mb-4"
          style={{ color: "#ffffff" }}
        >
          Cast
        </Typography>
        <Grid container spacing={3}>
          {cast.map((actor) => (
            <Grid item xs={6} sm={4} md={3} key={actor.id}>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <Typography
                    variant="body1"
                    className="font-bold text-center"
                    style={{ color: "#000000" }}
                  >
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-center mt-1"
                    style={{ color: "#000000" }}
                  >
                    as {actor.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MovieDetails;
