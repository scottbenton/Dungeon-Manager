import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { AppProviders } from './providers';

import '@fontsource/staatliches'; // Defaults to weight 400.
import '@fontsource/inter/variable.css';
import 'material-symbols';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
