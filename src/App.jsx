import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";
import Banner from "./pages/Banner";

const TOP_RATED_PAGE_SIZE = 10;

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMoviesPages, setTopRatedMoviesPages] = useState([[]]);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const popularContainerRef = useRef(null);
  const topRatedContainerRefs = useRef([React.createRef()]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch popular movies
        const popularResponse = await fetch(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdhMGU5MTU0M2MzYjA3NWVhNDU2M2U2YTk5ZGVkNiIsIm5iZiI6MTc0Njc3NjY4MS41NjksInN1YiI6IjY4MWRiMjY5ODUzN2IzNDI4MjkzYjI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsw9NwnDVSjldeytaLprOxCbUshgPONP1rNoxGszjqw",
            },
          }
        );
        const popularData = await popularResponse.json();
        setPopularMovies(popularData.results.slice(0, 10));

        // Fetch initial top-rated movies
        fetchTopRatedMovies(1, true);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
    // eslint-disable-next-line
  }, []);

  const fetchTopRatedMovies = async (page, replace = false) => {
    try {
      const topRatedResponse = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdhMGU5MTU0M2MzYjA3NWVhNDU2M2U2YTk5ZGVkNiIsIm5iZiI6MTc0Njc3NjY4MS41NjksInN1YiI6IjY4MWRiMjY5ODUzN2IzNDI4MjkzYjI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsw9NwnDVSjldeytaLprOxCbUshgPONP1rNoxGszjqw",
          },
        }
      );
      const topRatedData = await topRatedResponse.json();
      if (replace) {
        setTopRatedMoviesPages([
          topRatedData.results.slice(0, TOP_RATED_PAGE_SIZE),
        ]);
        topRatedContainerRefs.current = [React.createRef()];
      } else {
        setTopRatedMoviesPages((prev) => [
          ...prev,
          topRatedData.results.slice(0, TOP_RATED_PAGE_SIZE),
        ]);
        topRatedContainerRefs.current.push(React.createRef());
      }
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  const handleViewMore = () => {
    const nextPage = topRatedPage + 1;
    setTopRatedPage(nextPage);
    fetchTopRatedMovies(nextPage);
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const scrollCards = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderMovieRow = (movies, containerRef, title) => (
    <Box className="mt-10 relative">
      <Typography variant="h5" sx={{ marginBottom: 2, paddingLeft: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={() => scrollCards("left", containerRef)}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* Card Container */}
        <Box
          ref={containerRef}
          className="overflow-hidden"
          sx={{
            display: "flex",
            gap: 1,
            padding: 1,
            overflowX: "hidden",
          }}
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="shadow-md rounded-md relative cursor-pointer"
              sx={{
                minWidth: "230px",
                maxWidth: "100px",
                flexShrink: 0,
                boxShadow: 10,
                bgcolor: "ButtonFace",
                borderRadius: 5,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.08)",
                  boxShadow: 6,
                  zIndex: 2,
                },
              }}
              onClick={() => handleCardClick(movie.id)}
            >
              <CardMedia
                component="img"
                height="80"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography
                  variant="h6"
                  className="font-bold"
                  sx={{ fontSize: "1rem" }}
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {movie.release_date}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Rating: {movie.vote_average} / 10
                </Typography>
              </CardContent>
              {/* Favorite Icon */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(movie);
                }}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  color: favorites.some((fav) => fav.id === movie.id)
                    ? "red"
                    : "gray",
                  p: "4px",
                }}
              >
                {favorites.some((fav) => fav.id === movie.id) ? (
                  <FavoriteIcon sx={{ fontSize: 18 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Card>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={() => scrollCards("right", containerRef)}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <div>
      <Banner onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        renderMovieRow(searchResults, popularContainerRef, "Search Results")
      ) : (
        <>
          {renderMovieRow(popularMovies, popularContainerRef, "Popular Movies")}
          {/* Render each page of Top Rated Movies in its own row */}
          {topRatedMoviesPages.map((movies, idx) =>
            renderMovieRow(
              movies,
              (topRatedContainerRefs.current[idx] ||= React.createRef()),
              idx === 0 ? "Top Rated Movies" : `More Top Rated Movies`
            )
          )}
          <Box className="flex justify-center mt-8 mb-10">
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
        </>
      )}
    </div>
  );
};

export default App;
