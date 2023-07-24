import path from 'path';
import { fileURLToPath } from 'url';

// stores __dirname for use within ES6 modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const appRoute = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
};