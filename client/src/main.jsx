import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './provider/auth0-provider-with-navigate.jsx';
import RoutesUi from './routes/routes.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <RoutesUi />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </div>
);
