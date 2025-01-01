import { cyan, grey } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '58px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: cyan,
        secondary: {
          main: '#FFFFFF'
        },
      },

    },
    dark: {
      palette: {
        primary: grey,
        secondary: {
          main: '#111111'
        }
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.dark
            }
          },
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
        }),
      }
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: "4px",
            Height: "4px",
          },
          '*::-webkit-scrollbar-track': {
            background: "#f1f1f1",
          },
          '*::-webkit-scrollbar-thumb': {
            background: "#bdc3c7",
            borderRadius: "8px",
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: "#555",
          },
        }
      }
    }
  },
});

export default theme;
