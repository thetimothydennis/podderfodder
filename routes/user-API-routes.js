import express from 'express';
const router = express.Router();
import * as CTRLusers from '../controllers/users-controller.js';
import * as MWusers from '../middleware/user.mw.js';
import * as MWpods from '../middleware/podcasts.mw.js';
import { search } from '../controllers/search-pods-controller.js';
import isAuthenticated from '../middleware/is-authenticated.js';

router.use(isAuthenticated);

router.get('/api/search/', search);

router.route('/api/user/:id')
    // gets all podcasts for user
    .get(CTRLusers.getUserPods)
    // adds a podcast and episodes for a user in db
    .post(MWpods.ingestPod, MWusers.addUserPods, MWusers.updateOnePodcast, CTRLusers.updateUserPod)

router.route('/api/user/:userid/:podid')
    // gets a single podcast for a user
    .get(CTRLusers.getUserPod)
    // updates a single podcast for a user
    .put(MWusers.updateOnePodcast, CTRLusers.updateUserPod)
    // deletes a single podcast for a user
    .delete(CTRLusers.deleteUserPod);

router.route('/api/user/:userid/:podid/:epiid')
    // gets a single episode for a user
    .get(CTRLusers.getUserEpi)
    // deletes a single episode for a user
    .delete(CTRLusers.deleteUserEpi);

router.route('/api/allepisodes/:userid/')
    // sends episodes for all user podcasts
    .get(CTRLusers.getAllUserEpis);

export default router;