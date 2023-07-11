import * as podcasts from '../models/podcasts.model.js';
import { parseFeed } from '../functions/feed-functions.js';
import { errHandler } from '../controllers/users-controller.js';

// import pod and episodes, pass off to user controller
export const ingestPod = async (req, res, next) => {
    try {
        let feedUrl = req.body.feedurl;
        let insertPod = await parseFeed(feedUrl);
        let feedResponse = await podcasts.ingestFeed(insertPod);
        req.feedIngestRes = feedResponse;
        // res.send(feedResponse)
        next();
    }
    catch (error) {
        errHandler(error, res);
    };
};

// update pod and episodes, pass off to user controller
export const updatePod = async (req, res, next) => {
    try {
        const {
            userid,
            podid
        } = req.params;
        let getPodFeedUrl = Podcast.find({_id: podid});
        console.log(getPodFeedUrl)
    }
    catch (error) {
        errHandler(error, res);
    };
};
// delete one pod and epis from user

// delete all pods and epis from user