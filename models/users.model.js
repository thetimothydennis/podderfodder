import mongoose from "mongoose";
import { User } from "./user-schema.js";

// aggregation components
// match components
// match by userId
function aggrUserIdMatch(userId) {
	return {
		$match: { _id: { $in: [new mongoose.Types.ObjectId(userId)] } },
	};
}

// match by podcast id
function aggrPodIdMatch(podId) {
	return {
		$match: {
			"podcasts._id": { $in: [new mongoose.Types.ObjectId(podId)] },
		},
	};
}

// match by podcast feed URL
function aggrFeedURLMatch(feedUrl) {
	return {
		$match: { "podcasts.feedurl": feedUrl },
	};
}

// match by episode id
function aggrEpiIdMatch(epiId) {
	return {
		$match: {
			"podcasts.episodes._id": {
				$in: [new mongoose.Types.ObjectId(epiId)],
			},
		},
	};
}

// manipulation components
// unwind podcasts array
function aggrPodUnwind() {
	return {
		$unwind: { path: "$podcasts" },
	};
}

// unwind episodes array
function aggrEpiUnwind() {
	return {
		$unwind: { path: "$podcasts.episodes" },
	};
}

// standard aggregate projection
function aggrStdProjection() {
	return {
		$project: {
			name: 1,
			email: 1,
			_id: 1,
			podcasts: {
				pod_id: "$podcasts._id",
				show_title: 1,
				author: 1,
				feedurl: 1,
				image: 1,
				categories: 1,
				description: 1,
				buildDate: 1,
				episodes: {
					epi_id: "$podcasts.episodes._id",
					title: 1,
					epi_url: 1,
					content: 1,
					duration: 1,
					pubDate: 1,
				},
			},
		},
	};
}

// just podcasts aggregation
function aggrPodsProjection() {
	return {
		$project: {
			name: 1,
			email: 1,
			_id: 0,
			user_id: "$_id",
			podcasts: 1,
		},
	};
}

// get all user pods
export const getAllUserPods = async (userId) => {
	try {
		const userPods = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodsProjection(),
			aggrPodUnwind(),
			{ $sort: { "podcasts.buildDate": -1 } },
		]);
		return userPods;
	} catch (err) {
		return err.message;
	}
};

// get one user pod
export const getAUserPod = async (userId, podId) => {
	try {
		const userPods = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrPodsProjection(),
		]);
		return userPods;
	} catch (err) {
		return err.message;
	}
};

// get a user by id
export const getUserById = async (id) => {
	try {
		const user = await User.findById(id);
		return user;
	} catch (err) {
		return err.message;
	}
};

// update a user with new podcasts and episodes - for POST route
export const addPodsToUser = async (userId, feedRes) => {
	try {
		const feedData = feedRes;
		const podCheck = await User.find(
			{ $and: [{ _id: userId }, { "podcasts._id": feedRes[0]._id }] },
			{
				name: 1,
				email: 1,
				_id: 1,
				"podcasts.$": 1,
			},
		);
		if (podCheck.length > 0) {
			return podCheck;
		} else {
			await User.findOneAndUpdate(
				{ _id: userId },
				{ $push: { podcasts: feedData } },
			);
			const userReturn = await User.findById(userId);
			return userReturn;
		}
	} catch (err) {
		return err.message;
	}
};

// find podcast for user by feed URL
export const checkPodByURL = async (userId, feedURL) => {
	try {
		const checkURL = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrFeedURLMatch(feedURL),
			aggrStdProjection(),
		]);
		return checkURL;
	} catch (err) {
		return err.message;
	}
};

// delete a podcast and episodes from user
export const deleteAUserPod = async (userId, podId) => {
	try {
		const deleteUserPod = await User.updateOne(
			{ _id: userId },
			{ $pull: { podcasts: { _id: podId } } },
		);
		return deleteUserPod;
	} catch (err) {
		return err.message;
	}
};

// update podcast and episodes for user - for PUT route
export const updateUserPodAndEpis = async (userId, podId, feedObj) => {
	try {
		const userPodUrlGet = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrStdProjection(),
		]);
		if (userPodUrlGet.length === 0) {
			return ["podcast added to user"];
		} else {
			const feedUrl = userPodUrlGet[0].podcasts.feedurl;
			await deleteAUserPod(userId, podId);
			await User.findOneAndUpdate(
				{ _id: userId },
				{ $push: { podcasts: feedObj } },
			);
			const updatedPodReturn = await User.aggregate([
				aggrUserIdMatch(userId),
				aggrPodUnwind(),
				aggrFeedURLMatch(feedUrl),
				aggrStdProjection(),
			]);
			return updatedPodReturn;
		}
	} catch (err) {
		return err.message;
	}
};

// get a podcast for a user
export const getUserPodcast = async (userId, podId) => {
	try {
		const podFind = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrEpiUnwind(),
			aggrStdProjection(),
		]);
		return podFind;
	} catch (err) {
		return err.message;
	}
};

// get all podcasts for user
export const getUserPodcasts = async (userId) => {
	try {
		const getPods = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrEpiUnwind(),
			aggrStdProjection(),
		]);
		return getPods;
	} catch (err) {
		return err.message;
	}
};

// get all episodes for all user podcasts
export const getAllUserEpisodes = async (userId) => {
	try {
		const getEpisodes = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrEpiUnwind(),
			aggrStdProjection(),
			{ $sort: { "podcasts.episodes.pubDate": -1 } },
		]);
		return getEpisodes;
	} catch (err) {
		return err.message;
	}
};

// get an episode from a podcast from user
export const getUserEpisode = async (userId, podId, epiId) => {
	try {
		const getEpisode = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrEpiUnwind(),
			aggrEpiIdMatch(epiId),
			aggrStdProjection(),
		]);
		return getEpisode;
	} catch (err) {
		return err.message;
	}
};

// delete an episode from a podcast from user
export const deleteAUserEpi = async (userId, podId, epiId) => {
	try {
		const getEpiFromDb = await getUserEpisode(userId, podId, epiId);
		const epiUrl = getEpiFromDb[0].podcasts.episodes.epi_url;
		const deleteOneUserEpi = await User.updateOne(
			{ _id: userId, "podcasts.episodes.epi_url": epiUrl },
			{ $pull: { "podcasts.$.episodes": { epi_url: epiUrl } } },
		);
		return deleteOneUserEpi;
	} catch (err) {
		return err.message;
	}
};
