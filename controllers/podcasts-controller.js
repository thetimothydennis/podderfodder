import * as podcasts from '../models/podcasts.model.js';
import * as feedFunctions from '../functions/feed-functions.js'
import { Podcast } from '../pod-schema.js';

// get a single pod and episodes from db
export const getOnePod = async (req, res) => {
    try {
        let id = req.params.id;
        let findPod = await podcasts.readPodcast(id);
        res.send(findPod);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    };
};

// get one episode from db
export const getOneEpi = async (req, res) => {
    let epiId = req.params.id;
    try {
        let getOne = await podcasts.readOneEpisode(epiId);
        res.send(getOne);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
};

// get all pods and episodes from db
export const getAllPods = async (req, res) => {
    try {
        let allPods = await podcasts.readAllPodcasts();
        res.send(allPods);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};

// update a single pod and episodes from db
export const updateOnePodcast = async (req, res) => {
    try {
        // destructure req.params object
        let podId = req.params.id;
        // get the feed url for the pod from db
        const feedUrlToUpdate = await podcasts.readPodcast(podId);
        // use feedurl to parse the RSS
        const updateParsedFeed = await feedFunctions.parseFeed(feedUrlToUpdate[0].feedurl);
        // add the podcast id from db into the newly parsed feed object
        updateParsedFeed.id = podId;
        // pass off the updated feed object to the model
        await podcasts.updatePodFeed(updateParsedFeed);
        let updated = await podcasts.readPodcast(podId)
        res.send(updated);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};

// delete a single episode from db
export const deleteEpisode = async (req, res) => {
    let epiId = req.params.id;
    let podId = await podcasts.readOneEpisode(epiId);
    podId = podId.pod_id;
    let deletedEpi = await podcasts.deleteOneEpisode(podId, epiId);
    res.send(deletedEpi);
};

// delete a single pod and episodes from db
export const deleteOnePod = async (req, res) => {
    let id = req.params.id;
    try {
        let deletePodcast = await podcasts.deletePodcast(id);
        res.send(deletePodcast);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};

// delete all pods and episodes from db
export const deleteAllPods = async (req, res) => {
    try {
        let deleteAll = await podcasts.deleteAllPodcasts();
        res.send(deleteAll);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};