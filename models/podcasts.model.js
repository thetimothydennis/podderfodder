import { parseFeed, parseFeedURL } from '../functions/feed-functions.js'
import * as reformat from '../functions/data-type-manipulation.js'
import { podcast, episodes } from '../pod-schema.js';

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
            let itemCheck = await episodes.findOne({epi_url: url});
            if (itemCheck !== null) {
                continue;
            } else {
                let newEpisode = new episodes ({
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
        await podcast.findOneAndUpdate({
            feedurl: feedUrl
        },{
            $push: {
                episodes: {
                    $each: newEpis
                }
            }
        });
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
    const deleteAll = await podcast.deleteMany();
    return deleteAll;
}