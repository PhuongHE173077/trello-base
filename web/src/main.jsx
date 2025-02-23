import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { store } from './redux/store.js';
import theme from './theme.js';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { injectStore } from './Utils/axiosCustomiz.js';

let persistor = persistStore(store);

//inject store to use store in non-component files
injectStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </PersistGate>
    </Provider>,
  </BrowserRouter>

)
