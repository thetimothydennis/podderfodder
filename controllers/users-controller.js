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