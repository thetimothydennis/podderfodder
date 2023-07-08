import express from 'express';
import * as podsMW from '../middleware/podcasts.mw.js';
import * as podsCTRL from '../controllers/podcasts-controller.js'
const router = express.Router();

router.route('/api/podcasts')
    // adds a podcast to db
    .post(podsMW.ingestPod)
    // gets all pods from db
    .get(podsCTRL.getAllPods)
    // deletes all pods from db
    .delete(podsCTRL.deleteAllPods)

router.route('/api/podcasts/:id')
    // gets one pod from db
    .get(podsCTRL.getOnePod)
    // updates one pod in db
    .put(podsCTRL.updateOnePodcast)
    // deletes one pod from db
    .delete(podsCTRL.deleteOnePod)

export default router;