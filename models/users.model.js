import mongoose from 'mongoose';
import { User } from '../user-schema.js';
import { Podcast } from '../pod-schema.js';
import * as podcasts from '../models/podcasts.model.js'

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
    console.log(podCheck.length)
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
        let addedPodResponse = await User.findById(userId);
        return addPod;
    };
};
// get a podcast for a user
export const getUserPodcast = async (userId, podId) => {
    const podFind = await User.aggregate(
        [
            {
                $match: {
                    _id: {
                        $in: [new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $unwind: {
                    path: "$podcasts"
                },
            },
            {
                $match: {
                    "podcasts._id": {
                        $in: [new mongoose.Types.ObjectId(podId)]
                    } 
                }
            },
            {
                $unwind: {
                    path: "$podcasts.episodes"
                }
            },
            {
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
        ]
    );
    return podFind;
};

// get all podcasts for user
export const getUserPodcasts = async (userId) => {
    // let getPods = await User.findById(userId);
    const getPods = await User.aggregate(
        [
            {
                $match: {
                    _id: {
                        $in: [new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $unwind: {
                    path: "$podcasts"
                }
            },
            {
                $unwind: {
                    path: "$podcasts.episodes"
                }
            },
            {
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
        ]
    )
    return getPods;
};

// get an episode from a podcast from user
export const getUserEpisode = async (userId, podId, epiId) => {
    let getEpisode = await User.aggregate(
        [
            {
                $match: {
                    _id: {
                        $in: [new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $unwind: {
                    path: "$podcasts"
                }
            },
            {
                $match: {
                    "podcasts._id": {
                        $in: [new mongoose.Types.ObjectId(podId)]
                    }
                }
            },
            {
                $unwind: {
                    path: "$podcasts.episodes"
                }
            },
            {
                $match: {
                   "podcasts.episodes._id": {
                        $in: [new mongoose.Types.ObjectId(epiId)]
                    }
                }
            },
            {
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
        ]
    );
    return getEpisode;
}

// delete an episode from a podcast from user

// delete a podcast and episodes from user

// delete all podcasts and episodes from user

// delete a user from db
export const deleteAUser = async (id) => {
    let deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
};
