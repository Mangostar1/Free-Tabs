import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffac33',
      main: '#ff9800',
      dark: '#b26a00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#000',
    },
    text: {
      primary: '#ffffff', // Blanco para el texto principal
      secondary: '#e0e0e0', // Invertir el color de fondo para el texto secundario
      disabled: '#888', // Gris claro para texto deshabilitado
    },
  }
});

export default theme;