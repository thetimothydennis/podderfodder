import { createRoot } from 'react-dom/client';
import App from './routes/browser-router.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
);
