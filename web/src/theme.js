import { cyan, orange, red, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: cyan,
        secondary: orange,
      },

    },
    dark: {
      palette: {
        primary: teal,
        secondary: orange,
      },
    },

  },
});

export default theme;
