import * as podcasts from '../models/podcasts.model.js';
import { parseFeed } from '../functions/feed-functions.js';

// import pod and episodes, pass off to user controller
export const ingestPod = async (req, res) => {
    try {
        let feedUrl = req.body.feedurl;
        let insertPod = await parseFeed(feedUrl);
        let feedResponse = await podcasts.ingestFeed(insertPod);
        res.send(feedResponse);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
};

// update pod and episodes, pass off to user controller

// delete one pod and epis from user

// delete all pods and epis from user