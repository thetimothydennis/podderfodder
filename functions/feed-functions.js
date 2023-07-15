// parses rss feeds
import rssParser from 'rss-parser';
// instantiates a new rssParser when parser is called
const parser = new rssParser();
// imports from other parts of the codebase
import * as reformat from './data-type-manipulation.js';

// takes a feed URL and parses it into information that's easier to digest
export const parseFeed = async (feedUrl) => {
    try {
        // uses rssParser to parse the feed at the given url
        console.log(feedUrl)
        const parsedFeed = await parser.parseURL(feedUrl);
        // destructures data from the parsed feed
        let { title, description, lastBuildDate, items } = parsedFeed;
        // regex to remove HTML tags from the description if they are present in the feed
        if (description.match(/(<([^>]+)>)/gi)) {
            description = reformat.removeHTML(description);
        };
        // destructures more data from the feed
        const { author, image } = parsedFeed.itunes;
        // creates a categories property from the feed
        let categories = parsedFeed.itunes.categories.join(", ");
        let podObj = {
            title,
            description,
            author,
            image,
            lastBuildDate,
            categories,
            feedUrl,
            items
        };
        // returns an object containing the pertinent information from the podcast feed
        return podObj;
    }
    catch (error) {
        console.log(error);
        return error.message;
    };
};

export const parseFeedURL = async (feedUrl) => {
    let parsedFeed = await parser.parseURL(feedUrl);
    return parsedFeed;
};

// function for parsing episodes from the podcast feed
    // feedurl passed in from earlier in the controller
export const parseEpis = async (feedUrl) => {
    try {
        // uses the feed url to parse the feed for episodes
        const parseEpis = await parseFeedURL(feedUrl);
        // returns the episodes from the feed
        return parseEpis.items;
    }
    catch (error) {
        console.log(error.message);
        return error.message;
    };
};