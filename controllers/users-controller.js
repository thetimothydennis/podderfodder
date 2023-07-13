import * as users from '../models/users.model.js';
import { User } from '../user-schema.js';
import * as feedFunctions from '../functions/feed-functions.js'

// error handling
function errConsole (error) {
    return console.log(error.message)
};

function err404 (error, res) {
    return res.status(404).send(error.message)
};

function errHandler (error, res) {
    errConsole(error)
    err404(error, res)
};

// insert user into db
export const insertUser = async (req, res) => {
    let userObj = req.body;
    try {
        let insertAUser = await users.ingestUser(userObj);
        res.send(insertAUser);
    }
    catch (error) {
        errHandler(error, res);
    };
};

// get all users from db
export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await users.getAllUsers();
        res.send(allUsers);
    }
    catch (error) {
        errHandler(error, res);
    };
};

// get user from db using email and name
export const getAUser = async (req, res) => {
    const userObj = req.body;
    try {
        const gottenUser = await users.getUser(userObj);
        res.send(gottenUser)
    }
    catch (error) {
        errHandler(error, res);
    };
};

// update user by adding pod with epis to db
export const addUserPods = async (req, res) => {
    try {
        const userId = req.params.id;
        const feedDb = req.feedIngestRes;
        const userPodAdd = await users.addPodsToUser(userId, feedDb);
        res.send(userPodAdd)
    }
    catch (error) {
        errHandler(error, res);
    };
};

// updates a podcast for user in db
export const updateUserPod = async (req, res) => {
    try {
        const {
            userid,
            podid,
            updated
        } = req.params;
        // pass off updated feed object to the model
        let updatedUserPod = await users.updateUserPodAndEpis(userid, podid, updated);
        res.send(updatedUserPod)
    }
    catch (error) {
        errHandler(error, res);
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
        errHandler(error, res);
    };
};

// get all pods for user
export const getUserPods = async (req, res) => {
    try {
        let userId = req.params.id;
        let getPodcasts = await users.getUserPodcasts(userId);
        res.send(getPodcasts);
    }
    catch (error) {
        errHandler(error, res);
    };
};

// get single episode for user
export const getUserEpi = async (req, res) => {
    try {
        const { userid, podid, epiid } = req.params;
        let getAnEpi = await users.getUserEpisode(userid, podid, epiid);
        res.send(getAnEpi);
    }
    catch (error) {
        errHandler(error, res);
    };
};

// delete a single episode for a user
export const deleteUserEpi = async (req, res) => {
    const {
        userid,
        podid,
        epiid
    } = req.params;
    try {
        const deletedEpi = await users.deleteAUserEpi(userid, podid, epiid);
        res.send(deletedEpi);
    }
    catch (error) {
        errHandler(error, res);
    };
};

// delete a user pod
export const deleteUserPod = async (req, res) => {
    const {
        userid,
        podid
    } = req.params;
    try {
        let deletePod = await users.deleteAUserPod(userid, podid);
        res.send(deletePod)
    }
    catch (error) {
        errHandler(error, res);
    };
};

// delete all user pods
export const deleteUserPods = async (req, res) => {
    let userId = req.params.id;
    try {
        const deletePods = await users.deleteAllUserPods(userId);
        res.send(deletePods)
    }
    catch (error) {
        errHandler(error, res);
    };
};

// delete a user from db
export const deleteUser = async (req, res) => {
    let userid = req.params.userid;
    try {
        let deletedUser = await users.deleteAUser(userid);
        res.send(deletedUser);
    }
    catch (error) {
        errHandler(error, res);
    };
};