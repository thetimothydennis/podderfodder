import mongoose from 'mongoose';
import { User, Podcast, Episodes } from '../user-schema.js';
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

// match by podcast feed URL
const aggrFeedURLMatch = (feedUrl) => {
    return {
        $match: {
            "podcasts.feedurl": feedUrl
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
                    duration: 1,
                    pubDate: 1
                }
            }
        }
    }
};

const aggrSortEpis = {
    $sortArray: {
        input: "$episodes",
        sortBy: {
            pubDate: -1
        }
    }
}

// just podcasts aggregation
const aggrPodsProjection = () => {
    return {
        $project: {
            name: 1,
            email: 1,
            _id: 0,
            user_id: "$_id",
            podcasts: 1
        }
    }
};


// create a user
export const ingestUser = async (userObj) => {
    const {
        email,
        name
    } = userObj;
    let checkUser = await getUser(userObj);
    if (checkUser.length > 0) {
        return checkUser;
    }
    else {
        let newUser = new User({
            name,
            email
        });
        await newUser.save();
        return newUser;
    }
};

// get a user by name and email
export const getUser = async (userObj) => {
    const {
        name,
        email
    } = userObj;
    // let foundUser = await User.find({$and: [ {name: name},{email: email} ] })
    let foundUser = await User.aggregate(
        [
            {
                $match: {
                    $and: [{name: name}, {email: email}]
                }
            },
            aggrPodUnwind(),
            aggrEpiUnwind(),
            aggrStdProjection()
        ]
    );
    return foundUser;
};


// get all user pods
export const getAllUserPods = async (userId) => {
    let userPods = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodsProjection()
        ]
    );
    return userPods;
}

// get one user pod
export const getAUserPod = async (userId, podId) => {
    let userPods = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrPodIdMatch(podId),
            aggrPodsProjection()
        ]
    )
    return userPods;
}

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

// update a user with new podcasts and episodes - for POST route
export const addPodsToUser = async (userId, feedRes) => {
    let feedData = feedRes;
    let podCheck = await User.find({
        $and: [ {_id: userId },{ "podcasts._id": feedRes[0]._id }]
    },
    {
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
        }, {
            $push: {
                podcasts: feedData
            }
        });
        let userReturn = await User.findById(userId);
        return userReturn;
    };
};

// find podcast for user by feed URL
export const checkPodByURL = async (userId, feedURL) => {
    const checkURL = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrFeedURLMatch(feedURL),
            aggrStdProjection(),
        ]
    )
    return checkURL;
};

// update podcast and episodes for user - for PUT route
export const updateUserPodAndEpis = async (userId, podId, feedObj) => {
    let userPodUrlGet = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrPodIdMatch(podId),
            aggrStdProjection(),
        ]
    );
    let feedUrl = userPodUrlGet[0].podcasts.feedurl;
    await deleteAUserPod(userId, podId);
    await User.findOneAndUpdate({
        _id: userId
    }, {
        $push: {
            podcasts: feedObj
        }
    });
    let updatedPodReturn = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrFeedURLMatch(feedUrl),
            aggrStdProjection()
        ]
    );
    return updatedPodReturn;
};

// get a podcast for a user
export const getUserPodcast = async (userId, podId) => {
    console.log(userId)
    console.log(podId)
    const podFind = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrPodIdMatch(podId),
            aggrEpiUnwind(),
            aggrStdProjection()
        ]
    );
    console.log(podFind)
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

// get all episodes for all user podcasts
export const getAllUserEpisodes = async (userId) => {
    let getEpisodes = await User.aggregate(
        [
            aggrUserIdMatch(userId),
            aggrPodUnwind(),
            aggrEpiUnwind(),
            aggrStdProjection(),
            {
                $sort: {
                    "podcasts.episodes.pubDate": -1
                }
            }
        ]
    )
    return getEpisodes;
}

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
    const getEpiFromDb = await getUserEpisode(userId, podId, epiId);
    let epiUrl = getEpiFromDb[0].podcasts.episodes.epi_url;
    const deleteOneUserEpi = await User.updateOne({ _id: userId, 'podcasts.episodes.epi_url': epiUrl }, {
        $pull: {
            'podcasts.$.episodes': {
                epi_url: epiUrl
            }
        }
    });
    return deleteOneUserEpi;
};

// delete a podcast and episodes from user
export const deleteAUserPod = async (userId, podId) => {
    const deleteUserPod = await User.updateOne(
        { _id: userId },
        {
            $pull:
            {
                "podcasts": {
                    _id: podId
                }
            }
        }
    );
    return deleteUserPod;
};

// delete all podcasts and episodes from user
export const deleteAllUserPods = async (userId) => {
    const deleteUserPods = await User.updateOne({_id: userId}, {
        $pull: {
            podcasts: {}
        }
    }

    );
    return deleteUserPods;
};
// delete a user from db
export const deleteAUser = async (userId) => {
    let deleteUser = await User.deleteOne({ _id: userId });
    return deleteUser;
};
