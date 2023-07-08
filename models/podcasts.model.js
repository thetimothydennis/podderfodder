import { parseFeed, parseFeedURL } from '../functions/feed-functions.js'
import * as reformat from '../functions/data-type-manipulation.js'
import { Podcast, Episodes } from '../pod-schema.js';
import mongoose from 'mongoose';

// mongodb aggregate pipeline constant

const aggregatePipeline = async (matchObj) => {
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
                                content: "$$this.content"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    pod_id: "$_id",
                    show_title: "$show_title",
                    description: "$description",
                    author: "$author",
                    image: "$image",
                    feedurl: "$feedurl",
                    categories: "$categories",
                    episodes: "$episodes"
                }
            }
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
        let newEpis = [];
        for (let i = 0;(i < 20) && (i < items.length); i++) {

            let episode = items[i];
            let {
                title,
                pubDate,
                link,
                content
                } = episode;
            if (content.match(/(<([^>]+)>)/gi)) {
                content = reformat.removeHTML(content);
            };
            let { duration } = episode.itunes;
            if (duration.match(/:/gi)) {
                duration = reformat.deColonDuration(duration);
            };
            let { url } = episode.enclosure;
            let length = Math.round(duration / 60);
            let web_url = link;
            let epi_url = url;
            let itemCheck = await Episodes.findOne({epi_url: url});
            if (itemCheck !== null) {
                continue;
            } else {
                let newEpisode = new Episodes ({
                    title,
                    pubDate,
                    web_url,
                    epi_url,
                    length,
                    content
                });
                newEpis.push(newEpisode);
            };
        };
        await Podcast.findOneAndUpdate({
            feedurl: feedUrl
        },{
            $push: {
                episodes: {
                    $each: newEpis
                }
            }
        });
        let response = await aggregatePipeline(feedUrlMatch(feedUrl));
        return response;
    };
};
// read a podcast with episodes
export const readPodcast = async (id) => {
    // const getOnePod = await Podcast.findById(id);
    const getOnePod = await aggregatePipeline(idMatch(id))
    return getOnePod;
};

// read all podcasts with episodes
export const readAllPodcasts = async () => {
    let allPodResponse = await aggregatePipeline(emptyMatch);
    return allPodResponse;
};

// update a podcast and episodes
export const updatePodFeed = async (feedObj) => {
    const {
        title,
        description,
        author,
        image,
        feedUrl,
        categories,
        id
    } = feedObj;
    const updatePodFeed = await Podcast.findByIdAndUpdate({ _id: feedObj.id }, {
        show_title: title,
        description: description,
        author: author,
        image: image,
        feedurl: feedUrl,
        categories: categories
    });
    return updatePodFeed;
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
}