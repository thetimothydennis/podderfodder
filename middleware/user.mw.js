import * as users from '../models/users.model.js';
import * as podcasts from '../models/podcasts.model.js';
import * as feedFunctions from '../functions/feed-functions.js';
import { errHandler } from '../functions/err-handler.js';

// update user by adding pod with epis to db - for user/ POST route
export const addUserPods = async (req, res, next) => {
    try {
        let feedUrl = req.body.feedurl;
        req.feedurl = feedUrl;
        let insertPod = await feedFunctions.parseFeed(feedUrl);
        let checkPod = await podcasts.findByFeedUrl(feedUrl);
        if (checkPod.length > 0) {
            let podId = checkPod[0]._id;
            await podcasts.deletePodcast(podId)
        }
        let feedDb = await podcasts.ingestFeed(insertPod);
        const userId = req.params.userid;
        const checkUserPod = await users.checkPodByURL(userId, feedUrl);
        if (checkUserPod.length > 0) {
            let podId = checkUserPod[0].podcasts.pod_id;
            await users.deleteAUserPod(userId, podId)
        }
        await users.addPodsToUser(userId, feedDb);
        const getAddedPod = await users.checkPodByURL(userId, feedUrl);
        req.params.podid = getAddedPod[0].podcasts.pod_id;
        next();
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
        let { podid, userid } = req.params;
        let feedUrl;
        if (!req.feedurl) {
        // get the feed url for the pod from db
            let feedUrlToUpdate = await users.getUserPodcast(userid, podid);
            feedUrl = feedUrlToUpdate[0].podcasts.feedurl;
        } else {
            feedUrl = req.feedurl;
        };
        // use feedurl to parse the RSS
        const updateParsedFeed = await feedFunctions.parseFeed(feedUrl);
        // add the podcast id from db into the newly parsed feed object
        updateParsedFeed.id = podid;
        // pass off the updated feed object to the pods model
        let updated = await podcasts.updatePodFeed(updateParsedFeed);
        req.params.updated = updated;
        next();
    }
    catch (error) {
        errHandler(error, res);
    };
};