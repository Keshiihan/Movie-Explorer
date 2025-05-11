import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router"; 
import { Movie as MovieIcon } from "@mui/icons-material";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Sidebar />
        <MovieIcon sx={{ mr: 2 }} />
        {/* Make Movie Explorer a link */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/app"
            style={{
              textDecoration: "none",
              color: "inherit", // Inherit the AppBar text color
            }}
          >
            Movie Explorer
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;