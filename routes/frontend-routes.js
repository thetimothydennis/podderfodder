// package imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { appRoute} from '../controllers/frontend-controller.js';
import isAuthenticated from '../middleware/is-authenticated.js';
import { User } from '../models/user-schema.js';


// stores __dirname for use within ES6 modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// instantiates the frontend router
const router = express.Router();

// static middleware for serving the frontend
router.use(express.static(path.join(__dirname, "..", "client", "dist")));

// frontend routes
// login route
router.get("/login", appRoute);
// register route
router.get("/register", appRoute);

router.get('/forgotpassword', appRoute);

router.get('/resetpassword/:token', async (req, res) => {
    let { token } = req.params;
    let checkToken = await User.find({resetPasswordToken: token});
    console.log(checkToken)
    if (checkToken.length === 0) {
        res.redirect('/login')
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
    };
});

router.post('/api/resetpassword/:token', async (req, res) => {

    let { token } = req.params;
    let { newpassword, newpassmatch } = req.body;
    let user = await User.find({resetPasswordToken: token});
    let username = user[0].username;
    let updateUser;
    if (user.length === 0) {
        res.redirect(`/forgotpassword`)
    } else if (newpassword !== newpassmatch) {
        res.redirect(`/api/resetpassword/${token}`)
    } else {
        updateUser = await User.findOne({username: username});
        updateUser.setPassword(newpassword, async () => {
            await updateUser.save();
        }); 
        await User.findOneAndUpdate({username: username}, {resetPasswordToken: ''});
        res.redirect('/login');
    }
})

// authenticated app route
router.get("/app", isAuthenticated, appRoute);

router.get('/changepassword', isAuthenticated, appRoute);

// exports the router for index.js
export default router;