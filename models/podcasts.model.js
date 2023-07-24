import * as reformat from '../functions/data-type-manipulation.js'
import { Podcast, Episodes } from './user-schema.js';
import mongoose from 'mongoose';

// mongodb aggregate pipeline constant
const aggregatePipeline = async (matchObj, projection) => {
    let aggResult = await Podcast.aggregate(
        [
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
                                duration: "$$this.duration"
                            }
                        }
                    }
                }
            },
            projection
        ]
    );
    return aggResult;
};

const emptyMatch = {
    $match: {}
};

const feedUrlMatch = (feedUrl) => {
    return {
        $match: {
            feedurl: feedUrl
        }
    }
};

const idMatch = (id) => {
    return {
        $match: {
            _id: {
                $in: [new mongoose.Types.ObjectId(id)]
            }
        }
    }
};

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
        episodes: {
            $sortArray: {
                input: "$episodes",
                sortBy: {
                    pubDate: -1
                }
            }
        }
    }
};

const oneEpiProject = (onePodResponse, epiId) => {
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
                    cond: {"_id": epiId}
                }
            }
        }
    }
};

const epiHandler = async (itemsArr) => {
    let newEpis = [];
    for (let i = 0;(i < 20) && (i < itemsArr.length); i++) {
        let duration = itemsArr[i].itunes.duration;
        let url = itemsArr[i].enclosure.url;
        let episode = itemsArr[i];
        let {
            title,
            pubDate,
            link,
            content
            } = episode;
        let web_url = link;
        let epi_url = url;
        if (content.match(/(<([^>]+)>)/gi)) {
            content = reformat.removeHTML(content);
        };
        if (duration.match(/:/gi)) {
            duration = reformat.deColonDuration(duration);
        };
        duration = Math.round(duration / 60);
        let itemCheck = await Podcast.find({
            "episodes.epi_url": url
        }, {
            "episodes.$": 1
        });
        if (itemCheck.length > 0) {
            continue;
        } else if (itemCheck.length == 0) {
            let newEpisode = new Episodes ({
                title,
                pubDate,
                web_url,
                epi_url,
                duration,
                content
            });
            newEpis.push(newEpisode);
        };
    };
    return newEpis;
}

// create a podcast with episodes
export const ingestFeed = async (feedObj) => {
    // inserting podcast
    let {
        title,
        description,
        author,
        image,
        feedUrl,
        categories,
        items
    } = feedObj;
    if (description.match(/(<([^>]+)>)/gi)) {
        description = reformat.removeHTML(description);
    };
    let checkPod = await Podcast.find({ feedurl: feedUrl });
    if (checkPod.length !== 0) {
        return checkPod;
    } else {
        let insertPod = new Podcast ({
            show_title: title,
            description: description,
            author: author,
            image: image,
            feedurl: feedUrl,
            categories: categories,
            episodes: []
        });
        await insertPod.save();
        // inserting episodes
        let newEpis = await epiHandler(items);
        await Podcast.findOneAndUpdate({
            feedurl: feedUrl
        },{
            $push: {
                episodes: {
                    $each: newEpis
                }
            }
        });
        let response = await aggregatePipeline(feedUrlMatch(feedUrl), standardProject);
        return response;
    };
};
// read a podcast with episodes
export const readPodcast = async (id) => {
    const getOnePod = await aggregatePipeline(idMatch(id), standardProject)
    return getOnePod;
};

// read a podcast and one episode
export const readOneEpisode = async (id) => {
    let onePodResponse = await Podcast.find({
        "episodes._id": id
    }, {
        "episodes.$": 1
    });

    let epiId = onePodResponse[0].episodes[0]._id;
    let podId = onePodResponse[0]._id;
    
    const getOneEpi = await Podcast.aggregate(
        [
            idMatch(podId),
            oneEpiProject(onePodResponse, epiId)
        ]
    );
    return getOneEpi[0];
};

// delete one episode from podcast
export const deleteOneEpisode = async (podId, epiId) => {
    const deleteUpdate = await Podcast.updateOne(
        {
            _id: podId
        },
        {
            $pull: {
                episodes: {
                    _id: epiId
                }
            }
        }
    );
    return deleteUpdate
}

// read all podcasts with episodes
export const readAllPodcasts = async () => {
    let allPodResponse = await Podcast.aggregate(
        [
            emptyMatch,
            standardProject
        ]
    );
    return allPodResponse;
};

export const findByFeedUrl = async (feedUrl) => {
    let podCheck = await Podcast.find({ feedurl: feedUrl });
    return podCheck;
};

// update a podcast and episodes
    // pass in a parsed feed
export const updatePodFeed = async (feedObj) => {
    // destructure the needed elements from the feed object
    const {
        title,
        description,
        author,
        image,
        feedUrl,
        categories,
        items,
        id
    } = feedObj;
    // use the destructured elements to find the podcast, update the values
    let updates = await Podcast.findByIdAndUpdate({ _id: id }, {
        show_title: title,
        description: description,
        author: author,
        image: image,
        feedurl: feedUrl,
        categories: categories
    });
    // run the episodes array through the epiHandler
    let newEpisodes = await epiHandler(items)
    // update the podcast in db based on the feed url, push in the episodes
    let response = await Podcast.findOneAndUpdate({
        feedurl: feedUrl
    },{
        $push: {
            episodes: {
                $each: newEpisodes
            }
        }
    });
    // return the updated podcast
    // let response = await aggregatePipeline(feedUrlMatch(feedUrl), standardProject);
    return response;
};

// delete a podcast and episodes
export const deletePodcast = async (id) => {
    const deletePod = await Podcast.findByIdAndDelete(id);
    return deletePod;
};

// delete all podcasts
export const deleteAllPodcasts = async () => {
    const deleteAll = await Podcast.deleteMany();
    return deleteAll;
};