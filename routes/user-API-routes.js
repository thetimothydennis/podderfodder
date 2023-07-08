import express from 'express';
const router = express.Router();
import * as CTRLusers from '../controllers/users-controller.js';
import * as MWusers from '../middleware/user.mw.js';

router.route('/api/user')
    // adds a user to db
    .post(CTRLusers.insertUser)
    // gets a user from db using name and email
    .get(CTRLusers.getAUser)

router.route('/api/user/:id')
    // updates a user in db
    .put()
    // deletes a user from db
    .delete(CTRLusers.deleteUser)

router.route('/api/users')
    // gets all users from db
    .get(CTRLusers.getAllUsers)

export default router;