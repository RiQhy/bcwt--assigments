'use strict';
// userController
const userModel = require('../models/userModel')

const users = userModel.users;
for(const user of users){
        delete user.password;
}
const getUserList = (req, res) =>{
    res.json(users);
};

const getUser = (req, res) => {
    //console.log(req.params);
    const id = req.params.id;
    const filteredUsers = users.filter(user =>  id == user.id);
    if(filteredUsers.length > 0){
        res.json(filteredUsers[0]);
    } else {
    return res.sendStatus[404];
    }
};

const postUser = (req, res) =>{
    console.log(req.body);
    const newUser = {
        name: req.body.name,
        email :req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    res.status[201].send('Added user.' + req.body.name);
};

const putUser = (req, res) => {
    res.send('From this endpoint you can modify a user.');
};

const deleteUser = (req, res) => {
    res.send('From this endpoint you can delete a user.');
};



const userController = {getUserList, getUser, postUser, putUser, deleteUser };
module.exports = userController;