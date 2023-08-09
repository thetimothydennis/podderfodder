import mongoose from "mongoose";
import { User } from "./user-schema.js";

// aggregation components
// match components
// match by userId
const aggrUserIdMatch = (userId) => {
	return {
		$match: {
			_id: {
				$in: [new mongoose.Types.ObjectId(userId)],
			},
		},
	};
};

// match by podcast id
const aggrPodIdMatch = (podId) => {
	return {
		$match: {
			"podcasts._id": {
				$in: [new mongoose.Types.ObjectId(podId)],
			},
		},
	};
};

// match by podcast feed URL
const aggrFeedURLMatch = (feedUrl) => {
	return {
		$match: {
			"podcasts.feedurl": feedUrl,
		},
	};
};

// match by episode id
const aggrEpiIdMatch = (epiId) => {
	return {
		$match: {
			"podcasts.episodes._id": {
				$in: [new mongoose.Types.ObjectId(epiId)],
			},
		},
	};
};

// manipulation components
// unwind podcasts array
const aggrPodUnwind = () => {
	return {
		$unwind: {
			path: "$podcasts",
		},
	};
};

// unwind episodes array
const aggrEpiUnwind = () => {
	return {
		$unwind: {
			path: "$podcasts.episodes",
		},
	};
};

// standard aggregate projection
const aggrStdProjection = () => {
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
};

const aggrSortEpis = {
	$sortArray: {
		input: "$episodes",
		sortBy: {
			pubDate: -1,
		},
	},
};

const aggrSortPods = {
	$sortArray: {
		input: "$podcasts",
		sortBy: {
			buildDate: -1,
		},
	},
};

// just podcasts aggregation
const aggrPodsProjection = () => {
	return {
		$project: {
			name: 1,
			email: 1,
			_id: 0,
			user_id: "$_id",
			podcasts: 1,
		},
	};
};

// get all user pods
export const getAllUserPods = async (userId) => {
	try {
		let userPods = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodsProjection(),
			aggrPodUnwind(),
			{
				$sort: {
					"podcasts.buildDate": -1,
				},
			},
		]);
		return userPods;
	} catch (err) {
		console.log(err);
	}
};

// get one user pod
export const getAUserPod = async (userId, podId) => {
	try {
		let userPods = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrPodsProjection(),
		]);
		return userPods;
	} catch (err) {
		console.log(err);
	}
};

// get a user by id
export const getUserById = async (id) => {
	try {
		let user = await User.findById(id);
		return user;
	} catch (err) {
		console.log(err);
	}
};

// update a user with new podcasts and episodes - for POST route
export const addPodsToUser = async (userId, feedRes) => {
	try {
		let feedData = feedRes;
		let podCheck = await User.find(
			{
				$and: [{ _id: userId }, { "podcasts._id": feedRes[0]._id }],
			},
			{
				name: 1,
				email: 1,
				_id: 1,
				"podcasts.$": 1,
			}
		);
		if (podCheck.length > 0) {
			return podCheck;
		} else {
			await User.findOneAndUpdate(
				{
					_id: userId,
				},
				{
					$push: {
						podcasts: feedData,
					},
				}
			);
			let userReturn = await User.findById(userId);
			return userReturn;
		}
	} catch (err) {
		console.log(err);
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
		console.log(err);
	}
};

// update podcast and episodes for user - for PUT route
export const updateUserPodAndEpis = async (userId, podId, feedObj) => {
	try {
		let userPodUrlGet = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrStdProjection(),
		]);
		if (userPodUrlGet.length == 0) {
			return ["podcast added to user"];
		} else {
			let feedUrl = userPodUrlGet[0].podcasts.feedurl;
			await deleteAUserPod(userId, podId);
			await User.findOneAndUpdate(
				{
					_id: userId,
				},
				{
					$push: {
						podcasts: feedObj,
					},
				}
			);
			let updatedPodReturn = await User.aggregate([
				aggrUserIdMatch(userId),
				aggrPodUnwind(),
				aggrFeedURLMatch(feedUrl),
				aggrStdProjection(),
			]);
			return updatedPodReturn;
		}
	} catch (err) {
		console.log(err);
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
		console.log(err);
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
		console.log(err);
	}
};

// get all episodes for all user podcasts
export const getAllUserEpisodes = async (userId) => {
	try {
		let getEpisodes = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrEpiUnwind(),
			aggrStdProjection(),
			{
				$sort: {
					"podcasts.episodes.pubDate": -1,
				},
			},
		]);
		return getEpisodes;
	} catch (err) {
		console.log(err);
	}
};

// get an episode from a podcast from user
export const getUserEpisode = async (userId, podId, epiId) => {
	try {
		let getEpisode = await User.aggregate([
			aggrUserIdMatch(userId),
			aggrPodUnwind(),
			aggrPodIdMatch(podId),
			aggrEpiUnwind(),
			aggrEpiIdMatch(epiId),
			aggrStdProjection(),
		]);
		return getEpisode;
	} catch (err) {
		console.log(err);
	}
};

// delete an episode from a podcast from user
export const deleteAUserEpi = async (userId, podId, epiId) => {
	try {
		const getEpiFromDb = await getUserEpisode(userId, podId, epiId);
		let epiUrl = getEpiFromDb[0].podcasts.episodes.epi_url;
		const deleteOneUserEpi = await User.updateOne(
			{ _id: userId, "podcasts.episodes.epi_url": epiUrl },
			{
				$pull: {
					"podcasts.$.episodes": {
						epi_url: epiUrl,
					},
				},
			}
		);
		return deleteOneUserEpi;
	} catch (err) {
		console.log(err);
	}
};

// delete a podcast and episodes from user
export const deleteAUserPod = async (userId, podId) => {
	try {
		const deleteUserPod = await User.updateOne(
			{ _id: userId },
			{
				$pull: {
					podcasts: {
						_id: podId,
					},
				},
			}
		);
		return deleteUserPod;
	} catch (err) {
		console.log(err);
	}
};
