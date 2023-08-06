import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RoutesUi from './routes/routes.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
        <RoutesUi />
    </BrowserRouter>
  </>
);
