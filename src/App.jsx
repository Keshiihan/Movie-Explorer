import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";
import Banner from "./pages/Banner";
import SearchInput from "./components/SearchInput";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]); // State for top-rated movies
  const [favorites, setFavorites] = useState([]); // State to manage favorites
  const navigate = useNavigate(); // Initialize useNavigate
  const popularContainerRef = useRef(null); // Ref for the popular movies container
  const topRatedContainerRef = useRef(null); // Ref for the top-rated movies container
const [searchResults, setSearchResults] = useState([]); // State for search results

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
        setPopularMovies(popularData.results.slice(0, 10)); // Limit to 10 movies

        // Fetch top-rated movies
        const topRatedResponse = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdhMGU5MTU0M2MzYjA3NWVhNDU2M2U2YTk5ZGVkNiIsIm5iZiI6MTc0Njc3NjY4MS41NjksInN1YiI6IjY4MWRiMjY5ODUzN2IzNDI4MjkzYjI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsw9NwnDVSjldeytaLprOxCbUshgPONP1rNoxGszjqw",
            },
          }
        );
        const topRatedData = await topRatedResponse.json();
        setTopRatedMovies(topRatedData.results.slice(0, 10)); // Limit to 10 movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (results) => {
  setSearchResults(results); // Update search results
};

  // Function to toggle favorites
  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, movie]); // Add to favorites
    }
  };

  // Function to navigate to movie details
  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the movie details page
  };

  // Function to scroll the card container
  const scrollCards = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300; // Adjust scroll amount
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Render a row of movies
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
            gap: 1.5,
            padding: 1.5,
            overflowX: "hidden", 
            
          }}
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="shadow-md rounded-md relative cursor-pointer"
              sx={{
                minWidth: "150px", 
                flexShrink: 0,
              }}
              onClick={() => handleCardClick(movie.id)}
            >
              <CardMedia
                component="img"
                height="120" 
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold"
                  sx={{ fontSize: "0.875rem" }}
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  sx={{ fontSize: "0.75rem" }}
                >
                  {movie.release_date}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600"
                  sx={{ fontSize: "0.75rem" }}
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
                  top: 10,
                  right: 10,
                  color: favorites.some((fav) => fav.id === movie.id)
                    ? "red"
                    : "gray",
                }}
              >
                {favorites.some((fav) => fav.id === movie.id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
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
    {searchResults.length > 0
      ? renderMovieRow(searchResults, popularContainerRef, "Search Results")
      : (
        <>
          {renderMovieRow(popularMovies, popularContainerRef, "Popular Movies")}
          {renderMovieRow(topRatedMovies, topRatedContainerRef, "Top Rated Movies")}
        </>
      )}
  </div>
  );
};

export default App;