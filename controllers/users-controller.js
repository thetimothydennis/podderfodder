import * as users from '../models/users.model.js';

// insert user into db
export const insertUser = async (req, res) => {
    let userObj = req.body;
    try {
        let insertAUser = await users.ingestUser(userObj);
        res.send(insertAUser);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};
// get all users from db
export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await users.getAllUsers();
        res.send(allUsers);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
}

// get user from db using email and name
export const getAUser = async (req, res) => {
    const userObj = req.body;
    try {
        const gottenUser = await users.getUser(userObj);
        res.send(gottenUser)
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};

// update user pods and epis in db
export const addUserPods = async (req, res) => {
    try {
        const userId = req.params.id;
        const feedDb = req.feedIngestRes;
        const userPodAdd = await users.addPodsToUser(userId, feedDb);
        // add feedDb podcasts and episodes to the podcasts array in the user
        res.send(userPodAdd)
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};

// get a single pod from user in db
export const getUserPod = async (req, res) => {
    try {
        const { userid, podid } = req.params;
        let getPodcast = await users.getUserPodcast(userid, podid);
        res.send(getPodcast);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};

// get all pods for user
export const getUserPods = async (req, res) => {
    let userId = req.params.id;
    let getPodcasts = await users.getUserPodcasts(userId);
    res.send(getPodcasts);
};

// get single episode for user
export const getUserEpi = async (req, res) => {
    const { userid, podid, epiid } = req.params;
    let getAnEpi = await users.getUserEpisode(userid, podid, epiid);
    res.send(getAnEpi);
}

// delete a user from db
export const deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
        let deletedUser = await users.deleteAUser(id);
        res.send(deletedUser);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    };
};