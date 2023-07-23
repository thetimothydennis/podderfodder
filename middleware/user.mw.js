import * as users from '../models/users.model.js';
import * as podcasts from '../models/podcasts.model.js';
import * as feedFunctions from '../functions/feed-functions.js';
import { errHandler } from '../functions/err-handler.js';

// update user by adding pod with epis to db - for user/ POST route
export const addUserPods = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const feedDb = req.feedIngestRes;
        const feedUrl = feedDb[0].feedurl;
        const checkUserPod = await users.checkPodByURL(userId, feedUrl);
        if (checkUserPod.length > 0) {
            res.send(checkUserPod);
        }
        else {
            const userPodAdd = await users.addPodsToUser(userId, feedDb);
            req.id = userId;
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
        let {podid, userid} = req.params;
        if (req.podid) {
            req.podid = req.podid.toString();
            podid = req.podid;
        };
        if (req.id) {
            userid = req.id;
        };
        let podId = podid;
        // get the feed url for the pod from db
        const feedUrlToUpdate = await users.getUserPodcast(userid, podId);
        console.log(feedUrlToUpdate)
        // use feedurl to parse the RSS
        const updateParsedFeed = await feedFunctions.parseFeed(feedUrlToUpdate[0].podcasts.feedurl);

        // add the podcast id from db into the newly parsed feed object
        updateParsedFeed.id = podId;
        // pass off the updated feed object to the pods model
        let updateOp = await podcasts.updatePodFeed(updateParsedFeed);
        podId = updateOp._id;
        let updated = await podcasts.readPodcast(podId);
        req.params.updated = updated;
        console.log('updated podcast object')
        next();
    }
    catch (error) {
        errHandler(error, res);
    };
};