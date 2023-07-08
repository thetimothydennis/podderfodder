import mongoose from 'mongoose';
import { User } from '../user-schema.js';

// create a user
export const ingestUser = (userObj) => {
    const {
        email,
        name
    } = userObj;
    let newUser = new User({
        name,
        email
    });
    newUser.save();
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
}

// get all users
export const getAllUsers = async () => {
    let getUsers = await User.find({})
    return getUsers;
};

// update a user with new podcasts and episodes

// delete an episode from a podcast from user

// delete a podcast and episodes from user

// delete all podcasts and episodes from user

// delete a user from db
export const deleteAUser = async (id) => {
    let deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
};
