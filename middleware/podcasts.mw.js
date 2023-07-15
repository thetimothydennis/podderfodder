import * as podcasts from '../models/podcasts.model.js';
import * as feedFunctions from '../functions/feed-functions.js';
import { errHandler } from '../functions/err-handler.js';

// import pod and episodes, pass off to user controller
export const ingestPod = async (req, res, next) => {
    try {
        let checkPod = await podcasts.findByFeedUrl(req.body.feedurl);
        if (checkPod.length > 0) {
            console.log(checkPod)
            req.feedIngestRes = checkPod;
            next();
        }
        else {
            let feedUrl = req.body.feedUrl;
            let insertPod = await feedFunctions.parseFeed(feedUrl);
            let feedResponse = await podcasts.ingestFeed(insertPod);
            console.log(feedResponse)
            req.feedIngestRes = feedResponse;
            next();
        };
    }
    catch (error) {
        errHandler(error, res);
    };
};

// update pod and episodes, pass off to user controller
// update a single pod and episodes from db
export const updateOnePodcast = async (req, res, next) => {
    try {
        // destructure req.params object
        let podId = req.params.podid;
        // get the feed url for the pod from db
        const feedUrlToUpdate = await podcasts.readPodcast(podId);
        // use feedurl to parse the RSS
        const updateParsedFeed = await feedFunctions.parseFeed(feedUrlToUpdate[0].feedurl);
        // add the podcast id from db into the newly parsed feed object
        updateParsedFeed.id = podId;
        // pass off the updated feed object to the pods model
        await podcasts.updatePodFeed(updateParsedFeed);
        let updated = await podcasts.readPodcast(podId)
        req.params.updated = updated;
        next();
    }
    catch (error) {
        errHandler(error, message);
    };
};