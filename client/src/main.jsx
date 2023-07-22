import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RoutesUi from './routes/routes.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <BrowserRouter>
        <RoutesUi />
    </BrowserRouter>
  </div>
);
