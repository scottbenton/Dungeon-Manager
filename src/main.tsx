import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProviders } from './providers';

import '@fontsource-variable/playfair-display';
import '@fontsource-variable/inter';
import 'material-symbols';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>,
);
