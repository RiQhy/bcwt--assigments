'use strict';
// userController
const userModel = require('../models/userModel')


const getUserList = async (req, res) =>{
    try{
        const users = await userModel.getAllUsers();
        /*for(const user of users){
                delete user.password;
        }*/
        res.json(users);
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

const getUser = async (req, res) => {
    //console.log(req.params);
    const userId = Number(req.params.id);
    if(!Number.isInteger(userId)){
        res.status(400).json({error:500, message: 'invalid id'});
        return;
    }
    try{
        const [user] = await userModel.getUserById(userId);
        res.json(user);
    }catch(error){
        res.status(404).json({error: 500, message: error.message});
    }
};

const postUser = async (req, res) =>{
    console.log('posting a user',req.body, req.file);
    const newUser = req.body;
    newUser.name = req.file.name;
    const result = await userModel.insertUser(newUser);
    res.status(201).send('Added user.');
};

const putUser = async (req, res) => {
    //console.log('modifying user', req.body);
    try{
        const user = await userModel.modifyUser;
        res.json(user);
    } catch(error){
        res.status(200).json({error:500, message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try{
        const user = await userModel.deleteUser();
        res.json(user);
    } catch(error){
        res.status(200).json({error:500, message: error.message});
    }
};

const userController = {getUserList, getUser, postUser, putUser, deleteUser };
module.exports = userController;