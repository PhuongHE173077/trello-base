import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { store } from './redux/store.js';
import theme from './theme.js';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </Provider>,
  </BrowserRouter>

)
