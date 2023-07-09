import mongoose from 'mongoose';
import { User } from '../user-schema.js';
import { Podcast } from '../pod-schema.js';
import * as podcasts from '../models/podcasts.model.js'
import { deleteUser } from '../controllers/users-controller.js';

// aggregation components
// match components
// match by userId
const aggrUserIdMatch = (userId) => {
    return {
        $match: {
            _id: {
                $in: [new mongoose.Types.ObjectId(userId)]
            }
        }
    }
};

// match by podcast id
const aggrPodIdMatch = (podId) => {
    return {
        $match: {
            "podcasts._id": {
                $in: [new mongoose.Types.ObjectId(podId)]
            }
        }
    }
};

// match by episode id
const aggrEpiIdMatch = (epiId) => {
    return {
        $match: {
           "podcasts.episodes._id": {
                $in: [new mongoose.Types.ObjectId(epiId)]
            }
        }
    }
};

// manipulation components
// unwind podcasts array
const aggrPodUnwind = () => {
    return {
        $unwind: {
            path: "$podcasts"
        },
    }
};

// unwind episodes array
const aggrEpiUnwind = () => {
    return {
        $unwind: {
            path: "$podcasts.episodes"
        }
    }
};

// set podcasts array to empty
const aggrDeleteAllPOds = () => {
    return {
        $set: {
            podcasts: []
        }
    }
};

// standard aggregate projection
const aggrStdProjection = () => {
    return {
        $project: {
            name: 1,
            email: 1,
            _id: 0,
            user_id: "$_id",
            podcasts: {
                pod_id: "$podcasts._id",
                show_title: 1,
                author: 1,
                feedurl: 1,
                image: 1,
                categories: 1,
                description: 1,
                episodes: {
                    epi_id: "$podcasts.episodes._id",
                    title: 1,
                    epi_url: 1,
                    content: 1,
                    length: 1
                }
            }          
        }
    }
};


// create a user
export const ingestUser = async (userObj) => {
    const {
        email,
        name
    } = userObj;
    let newUser = new User({
        name,
        email
    });
    await newUser.save();
    return newUser;
};

// get a user by name and email
export const getUser = async (userObj) => {
    const {
        name,
        email
    } = userObj;
    let foundUser = await User.findOne(
        {name: name, email: email}
    ).exec();
    return foundUser;
};

// get a user by id
export const getUserById = async (id) => {
    let user = await User.findById(id);
    return user;
};

// get all users
export const getAllUsers = async () => {
    let getUsers = await User.find({})
    return getUsers;
};

// update a user with new podcasts and episodes
export const addPodsToUser = async (userId, feedRes) => {
    let feedData = feedRes[0];
    let podCheck = await User.find(
        {_id: userId, "podcasts._id": feedData._id }, {
            name: 1,
            email: 1,
            _id: 1,
            "podcasts.$": 1
        }
    );
    if (podCheck.length > 0) {
        return podCheck;
    }
    else {
        let addPod = await User.findOneAndUpdate({
            _id: userId
        },{
            $push: {
                podcasts: feedData
            }
        });
        await User.findById(userId);
        return addPod;
    };
};
// get a podcast for a user
export const getUserPodcast = async (userId, podId) => {
    const podFind = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrPodIdMatch(podId),
            aggrEpiUnwind(),
            aggrStdProjection()
        ]
    );
    return podFind;
};

// get all podcasts for user
export const getUserPodcasts = async (userId) => {
    // let getPods = await User.findById(userId);
    const getPods = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrEpiUnwind(),
            aggrStdProjection()
        ]
    );
    return getPods;
};

// get an episode from a podcast from user
export const getUserEpisode = async (userId, podId, epiId) => {
    let getEpisode = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrPodIdMatch(podId),
            aggrEpiUnwind(),
            aggrEpiIdMatch(epiId),
            aggrStdProjection()
        ]
    );
    return getEpisode;
};

// delete an episode from a podcast from user
export const deleteAUserEpi = async (userId, podId, epiId) => {
    const deleteUserEpi = await User.findOneAndUpdate(
    {_id: userId},
    {
        $pull: {
            podcasts: {
                _id: podId,
                episodes: {
                    _id: epiId
                }
            }
        }
    }
    )
    return deleteUserEpi;
}

// delete a podcast and episodes from user
export const deleteAUserPod = async (userId, podId) => {
    const deleteUserPod = await User.updateOne(
        {_id: userId},
        {
            $pull: 
            {
                podcasts: {
                    _id: podId
                }
            }
        }
    );
    return deleteUserPod;
};

// delete all podcasts and episodes from user
export const deleteAllUserPods = async (userId) => {
    const deleteUserPods = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrDeleteAllPOds()
        ]
    );
    return deleteUserPods;
};
// delete a user from db
export const deleteAUser = async (userId) => {
    let deleteUser = await User.findByIdAndDelete(userId);
    return deleteUser;
};
