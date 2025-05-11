import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoritesAction = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the MovieDetails page with the movie ID
  };

  return (
    <div className="max-w-sm mx-auto my-4">
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.original_title}
        />
        <CardContent className="p-4">
          <Typography
            variant="h6"
            className="font-bold mb-2"
            style={{ color: theme.palette.text.main }} // Apply text color from theme
          >
            {movie.original_title}
          </Typography>
          <Typography
            variant="body2"
            className="mb-4"
            style={{ color: theme.palette.text.main }} // Apply text color from theme
          >
            {movie.overview}
          </Typography>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.main }} // Apply text color from theme
            >
              Language: {movie.original_language.toUpperCase()}
            </Typography>
            <div className="flex gap-2">
              {/* View Details Button */}
              <Button
                variant="outlined"
                startIcon={<InfoIcon />}
                size="small"
                style={{
                  color: theme.palette.primary.main, 
                  borderColor: theme.palette.primary.main,  
                }}
                className="!rounded-full hover:!bg-blue-50 shadow-sm transition-all"
                onClick={handleViewDetails} // Navigate to MovieDetails
              >
                View Details
              </Button>

              {/* Favorite Icon */}
              <IconButton
                onClick={handleFavoritesAction}
                style={{
                  color: isFavorite
                    ? theme.palette.Favorite.main 
                    : theme.palette.text.main, 
                }}
                className="hover:!bg-red-50 transition-all"
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    original_language: PropTypes.string.isRequired,
  }).isRequired,
  isFavoritePage: PropTypes.bool,
};

export default MovieCard;