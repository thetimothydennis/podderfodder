import express from 'express';
const router = express.Router();
import * as CTRLusers from '../controllers/users-controller.js';
import * as MWusers from '../middleware/user.mw.js';
import * as MWpods from '../middleware/podcasts.mw.js';

router.route('/api/user')
    // adds a user to db
    .post(CTRLusers.insertUser)
    // gets a user from db using name and email
    .get(CTRLusers.getAUser)

router.route('/api/user/:id')
    // gets all podcasts for user
    .get(CTRLusers.getUserPods)
    // adds a podcast and episodes for a user in db
    .post(MWpods.ingestPod, CTRLusers.addUserPods)
    // deletes all user pods from db
    .delete(CTRLusers.deleteUserPods)

router.route('/api/user/:userid/:podid')
    // gets a single podcast for a user
    .get(CTRLusers.getUserPod)
    // updates a single podcast for a user
    .put(MWusers.updateOnePodcast, CTRLusers.updateUserPod)
    // deletes a single podcast for a user
    .delete(CTRLusers.deleteUserPod)

router.route('/api/user/:userid/:podid/:epiid')
    // gets a single episode for a user
    .get(CTRLusers.getUserEpi)
    // deletes a single episode for a user
    .delete(CTRLusers.deleteUserEpi)

router.route('/api/users')
    // gets all users from db
    .get(CTRLusers.getAllUsers)

router.route('/api/users/:userid')
    // deletes a user from db
    .delete(CTRLusers.deleteUser)

export default router;