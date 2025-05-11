import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      className="bg-gray-800 text-white py-4"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%", // Ensure the footer spans the full width
        marginTop: "auto", // Push the footer to the bottom when content is short
      }}
    >
      <Typography variant="body2" className="text-center">
        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </Typography>
      <Box mt={1}>
        <Link
          href="#"
          color="inherit"
          underline="hover"
          className="text-gray-400 hover:text-white mx-2"
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          color="inherit"
          underline="hover"
          className="text-gray-400 hover:text-white mx-2"
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          color="inherit"
          underline="hover"
          className="text-gray-400 hover:text-white mx-2"
        >
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;