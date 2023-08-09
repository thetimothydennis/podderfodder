import * as users from "../models/users.model.js";
import { errHandler } from "../functions/err-handler.js";

// updates a podcast for user in db - for user/ PUT route
export const updateUserPod = async (req, res) => {
	try {
		let { userid, podid, updated } = req.params;
		// pass off updated feed object to the model
		let updatedUserPod = await users.updateUserPodAndEpis(
			userid,
			podid,
			updated
		);
		res.send(updatedUserPod);
	} catch (error) {
		errHandler(error, res);
	}
};

// get a single pod from user in db
export const getUserPod = async (req, res) => {
	try {
		const { userid, podid } = req.params;
		// let getPodcast = await users.getUserPodcast(userid, podid);
		let getPodcast = await users.getAUserPod(userid, podid);
		res.send(getPodcast);
	} catch (error) {
		errHandler(error, res);
	}
};

// get all pods for user
export const getUserPods = async (req, res) => {
	try {
		let userId = req.params.userid;
		// let getPodcasts = await users.getUserPodcasts(userId);
		let getPodcasts = await users.getAllUserPods(userId);
		res.send(getPodcasts);
	} catch (error) {
		errHandler(error, res);
	}
};

// get single episode for user
export const getUserEpi = async (req, res) => {
	try {
		const { userid, podid, epiid } = req.params;
		let getAnEpi = await users.getUserEpisode(userid, podid, epiid);
		res.send(getAnEpi);
	} catch (error) {
		errHandler(error, res);
	}
};

// get episodes for all user podcasts
export const getAllUserEpis = async (req, res) => {
	try {
		let userId = req.params.userid;
		let getEpis = await users.getAllUserEpisodes(userId);
		res.send(getEpis);
	} catch (err) {
		errHandler(err, res);
	}
};

// delete a single episode for a user
export const deleteUserEpi = async (req, res) => {
	try {
		const { userid, podid, epiid } = req.params;
		const deletedEpi = await users.deleteAUserEpi(userid, podid, epiid);
		res.send(deletedEpi);
	} catch (error) {
		errHandler(error, res);
	}
};

// delete a user pod
export const deleteUserPod = async (req, res) => {
	try {
		const { userid, podid } = req.params;
		let deletePod = await users.deleteAUserPod(userid, podid);
		res.send(deletePod);
	} catch (error) {
		errHandler(error, res);
	}
};
