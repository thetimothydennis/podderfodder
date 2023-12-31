import * as users from "../models/users.model.js";
import * as podcasts from "../models/podcasts.model.js";
import * as feedFunctions from "../functions/feed-functions.js";
import { errHandler } from "../functions/err-handler.js";

// update user by adding pod with epis to db - for user/ POST route
export const addUserPods = async (req, res, next) => {
	try {
		let feedDb;
		const feedUrl = req.body.feedurl;
		const userId = req.params.userid;
		const checkPod = await podcasts.findByFeedUrl(req.body.feedurl);
		if (checkPod.length > 0) {
			feedDb = checkPod;
		} else {
			const feedUrl = req.body.feedurl;
			req.feedurl = feedUrl;
			const insertPod = await feedFunctions.parseFeed(feedUrl);
			feedDb = await podcasts.ingestFeed(insertPod);
		}
		const checkUserPod = await users.checkPodByURL(userId, feedUrl);
		if (checkUserPod.length > 0) {
			const podId = checkUserPod[0].podcasts.pod_id;
			await users.deleteAUserPod(userId, podId);
		}
		await users.addPodsToUser(userId, feedDb);
		const getAddedPod = await users.checkPodByURL(userId, feedUrl);
		req.params.podid = getAddedPod[0].podcasts.pod_id;
		next();
	} catch (error) {
		errHandler(error, res);
	}
};

// update pod and episodes, pass off to user controller
// update a single pod and episodes from db
export const updateOnePodcast = async (req, res, next) => {
	try {
		// destructure req.params object
		let { podid, userid } = req.params;
		// get the feed url for the pod from db
		const feedUrlToUpdate = await users.getUserPodcast(userid, podid);
		const feedUrl = feedUrlToUpdate[0].podcasts.feedurl;
		// use feedurl to parse the RSS
		const updateParsedFeed = await feedFunctions.parseFeed(feedUrl);
		// add the podcast id from db into the newly parsed feed object
		updateParsedFeed.id = podid;
		// pass off the updated feed object to the pods model
		const updateOp = await podcasts.updatePodFeed(updateParsedFeed);
		podid = updateOp._id;
		const updated = await podcasts.readPodcast(podid);
		req.params.updated = updated;
		next();
	} catch (error) {
		errHandler(error, res);
	}
};
