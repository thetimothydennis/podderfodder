import * as users from '../models/users.model.js';
import * as podcasts from '../models/podcasts.model.js';
import * as feedFunctions from '../functions/feed-functions.js';
import { errHandler } from '../functions/err-handler.js';

// update pod and episodes, pass off to user controller
// update a single pod and episodes from db
export const updateOnePodcast = async (req, res, next) => {
    try {
        // destructure req.params object
        let {podid, userid} = req.params;
        let podId = podid;
        // get the feed url for the pod from db
        const feedUrlToUpdate = await users.getUserPodcast(userid, podid);
        // use feedurl to parse the RSS
        const updateParsedFeed = await feedFunctions.parseFeed(feedUrlToUpdate[0].podcasts.feedurl);

        // add the podcast id from db into the newly parsed feed object
        updateParsedFeed.id = podId;
        // pass off the updated feed object to the pods model
        let updateOp = await podcasts.updatePodFeed(updateParsedFeed);
        podId = updateOp._id;
        let updated = await podcasts.readPodcast(podId);
        req.params.updated = updated;
        next();
    }
    catch (error) {
        errHandler(error, message);
    };
};