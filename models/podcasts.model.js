import { parseFeed, parseFeedURL } from '../functions/feed-functions.js'
import * as reformat from '../functions/data-type-manipulation.js'
import { podcast } from '../pod-schema.js';

// create a podcast with episodes
export const ingestFeed = async (feedObj) => {
    let {
        title,
        description,
        author,
        image,
        feedUrl,
        categories
    } = feedObj;
    if (description.match(/(<([^>]+)>)/gi)) {
        description = reformat.removeHTML(description);
    };
    
    let checkPod = await podcast.find({ feedurl: feedUrl });
    if (checkPod.length !== 0) {
        return checkPod;
    } else {
        let insertPod = new podcast ({
            show_title: title,
            description: description,
            author: author,
            image: image,
            feedurl: feedUrl,
            categories: categories,
            episodes: []
        });
        await insertPod.save();
        let response = await podcast.find({ feedurl: feedUrl });
        return response;
    };
};
// read a podcast with episodes
export const readPodcast = async (id) => {
    const getOnePod = await podcast.findById(id);
    return getOnePod;
};

// read all podcasts with episodes
export const readAllPodcasts = async () => {
    const getAllPods = await podcast.find();
    return getAllPods;
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
    const updatePodFeed = await podcast.findOneAndUpdate({ _id: feedObj.id }, {
        show_title: title,
        description: description,
        author: author,
        image: image,
        feedurl: feedUrl,
        categories: categories
    });
    await updatePodFeed.save();
}

// delete a podcast and episodes
export const deletePodcast = async (id) => {
    const deletePod = await podcast.findByIdAndDelete(id);
    return deletePod;
};

// delete all podcasts
export const deleteAllPodcasts = async () => {
    const deleteAll = await podcast.deleteAll();
    return deleteAll;
}