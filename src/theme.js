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
      light: '#ffdf66',
      main: '#ffd740',
      dark: '#b2962c',
      contrastText: '#000',
    },
  },
});

export default theme;