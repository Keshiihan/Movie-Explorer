import React from 'react';
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#a989ea', 
    },
    secondary: {
      main: '#1f5de2',  
    },
    Text: {
      main: '#ffffff',  
    },
    Favorite: {
      main: '#ff0000',  
    },
  },
});

export default Theme;