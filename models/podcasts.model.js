import * as reformat from "../functions/data-type-manipulation.js";
import { Podcast, Episodes } from "./user-schema.js";
import mongoose from "mongoose";

// mongodb aggregate pipeline constant
async function aggregatePipeline (matchObj, projection) {
	try {
		let aggResult = await Podcast.aggregate([
			matchObj,
			{
				$set: {
					episodes: {
						$map: {
							input: "$episodes",
							in: {
								epi_id: "$$this._id",
								title: "$$this.title",
								pubDate: "$$this.pubDate",
								web_url: "$$this.web_url",
								epi_url: "$$this.epi_url",
								length: "$$this.length",
								content: "$$this.content",
								duration: "$$this.duration",
							},
						},
					},
				},
			},
			projection,
		]);
		return aggResult;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
}

const emptyMatch = {
	$match: {},
};

function feedUrlMatch (feedUrl) {
	return {
		$match: {
			feedurl: feedUrl,
		},
	};
}

function idMatch (id) {
	return {
		$match: {
			_id: {
				$in: [new mongoose.Types.ObjectId(id)],
			},
		},
	};
}

const standardProject = {
	$project: {
		_id: 0,
		pod_id: "$_id",
		show_title: "$show_title",
		description: "$description",
		author: "$author",
		image: "$image",
		feedurl: "$feedurl",
		categories: "$categories",
		buildDate: "$buildDate",
		episodes: {
			$sortArray: {
				input: "$episodes",
				sortBy: {
					pubDate: -1,
				},
			},
		},
	},
};

function oneEpiProject (onePodResponse, epiId) {
	return {
		$project: {
			_id: 0,
			pod_id: "$_id",
			show_title: "$show_title",
			description: "$description",
			author: "$author",
			image: "$image",
			feedurl: "$feedurl",
			categories: "$categories",
			episodes: {
				$filter: {
					input: [onePodResponse[0].episodes],
					cond: { _id: epiId },
				},
			},
		},
	};
}

async function epiHandler (itemsArr) {
	try {
		let newEpis = [];
		for (let i = 0; i < 20 && i < itemsArr.length; i++) {
			if (itemsArr[i].enclosure.type === "video/mp4") {
				continue;
			} else {
				let duration = itemsArr[i].itunes.duration;
				let url = itemsArr[i].enclosure.url;
				let episode = itemsArr[i];
				let { title, pubDate, link, content } = episode;
				let web_url = link;
				let epi_url = url;
				if (content && content.match(/(<([^>]+)>)/gi)) {
					content = reformat.removeHTML(content);
				}
				if (duration && duration.match(/:/gi)) {
					duration = reformat.deColonDuration(duration);
				}
				duration = Math.round(duration / 60);
				let itemCheck = await Podcast.find(
					{ "episodes.epi_url": url, },
					{ "episodes.$": 1, }
				);
				if (itemCheck.length > 0) {
					continue;
				} else if (itemCheck.length === 0) {
					let newEpisode = new Episodes({
						title,
						pubDate,
						web_url,
						epi_url,
						duration,
						content,
					});
					newEpis.push(newEpisode);
				}
			}
		}
		return newEpis;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		return err;
	}
}

// create a podcast with episodes
export const ingestFeed = async (feedObj) => {
	try {
		// inserting podcast
		let {
			title,
			description,
			author,
			image,
			feedUrl,
			categories,
			items,
			lastBuildDate,
		} = feedObj;
		if (!author) {author = title;}
		if (!lastBuildDate) {lastBuildDate = items[0].pubDate;}
		if (description && description.match(/(<([^>]+)>)/gi)) {
			description = reformat.removeHTML(description);
		}
		let checkPod = await Podcast.find({ feedurl: feedUrl });
		if (checkPod.length !== 0) {return checkPod;}
		else {
			let insertPod = new Podcast({
				show_title: title,
				description: description,
				author: author,
				image: image,
				feedurl: feedUrl,
				categories: categories,
				buildDate: lastBuildDate,
				episodes: [],
			});
			await insertPod.save();
			// inserting episodes
			let newEpis = await epiHandler(items);
			await Podcast.findOneAndUpdate(
				{ feedurl: feedUrl, },
				{ $push: { episodes: {	$each: newEpis,	}, }, }
			);
			let response = await aggregatePipeline(
				feedUrlMatch(feedUrl),
				standardProject
			);
			return response;
		}
		// eslint-disable-next-line no-console
	} catch (err) {	console.log(err);}
};
// read a podcast with episodes
export const readPodcast = async (id) => {
	try {
		const getOnePod = await aggregatePipeline(idMatch(id), standardProject);
		return getOnePod;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// read a podcast and one episode
export const readOneEpisode = async (id) => {
	try {
		let onePodResponse = await Podcast.find(
			{
				"episodes._id": id,
			},
			{
				"episodes.$": 1,
			}
		);

		let epiId = onePodResponse[0].episodes[0]._id;
		let podId = onePodResponse[0]._id;

		const getOneEpi = await Podcast.aggregate([
			idMatch(podId),
			oneEpiProject(onePodResponse, epiId),
		]);
		return getOneEpi[0];
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// delete one episode from podcast
export const deleteOneEpisode = async (podId, epiId) => {
	try {
		const deleteUpdate = await Podcast.updateOne(
			{
				_id: podId,
			},
			{
				$pull: {
					episodes: {
						_id: epiId,
					},
				},
			}
		);
		return deleteUpdate;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// read all podcasts with episodes
export const readAllPodcasts = async () => {
	try {
		let allPodResponse = await Podcast.aggregate([
			emptyMatch,
			standardProject,
		]);
		return allPodResponse;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

export const findByFeedUrl = async (feedUrl) => {
	try {
		let podCheck = await Podcast.find({ feedurl: feedUrl });
		return podCheck;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// update a podcast and episodes
// pass in a parsed feed
export const updatePodFeed = async (feedObj) => {
	try {
		// destructure the needed elements from the feed object
		let {
			title,
			description,
			author,
			image,
			feedUrl,
			categories,
			items,
			id,
			lastBuildDate,
		} = feedObj;
		if (!author) {
			author = title;
		}
		if (!lastBuildDate) {
			lastBuildDate = items[0].pubDate;
		}
		// use the destructured elements to find the podcast, update the values
		await Podcast.findByIdAndUpdate(
			{ _id: id },
			{
				show_title: title,
				description: description,
				author: author,
				image: image,
				feedurl: feedUrl,
				categories: categories,
				buildDate: lastBuildDate,
			}
		);
		// run the episodes array through the epiHandler
		let newEpisodes = await epiHandler(items);
		// update the podcast in db based on the feed url, push in the episodes
		let response = await Podcast.findOneAndUpdate(
			{ feedurl: feedUrl, },
			{ $push: {
					episodes: { $each: newEpisodes, },
			}, }
		);
		// return the updated podcast
		return response;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// delete a podcast and episodes
export const deletePodcast = async (id) => {
	try {
		const deletePod = await Podcast.findByIdAndDelete(id);
		return deletePod;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// delete all podcasts
export const deleteAllPodcasts = async () => {
	try {
		const deleteAll = await Podcast.deleteMany();
		return deleteAll;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};
