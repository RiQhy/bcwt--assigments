'use strict';
// catController

const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');

const getCatList = async (req, res) =>{
    try {
        let cats = await catModel.getAllCats();
        //console.logs(cats);
        cats = cats.map(cat => {
            //convert ISO date to date only
            cat.birthdate = cat.birthdate.toISOString().split('T')[0];
            return cat;
        });
        res.json(cats);
    } catch (error){
        res.status(500).json({error: 500, message: error.message});
    }
};

const getCat = async (req, res) => {
    //console.log(req.params);
    const catId = Number(req.params.id);
    if(!Number.isInteger(catId)){
        res.status(400).json({error:500, message: 'invalid id'});
        return;
    }
    //TODO wrap to try-catch
    try{
        const [cat] = await catModel.getCatById(catId);
        res.json(cat)
    } catch(error){
        res.status(404).json({message: 'Cat not found.'});
    }
};

const postCat = async (req, res) =>{
    //console.log('posting a cat', req.body, req.file);
    if(!req.file){
        res.status(400).json({
            status: 400,
            message: 'Invalid or missing image file'
        });
        return;
    }
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(), 
            message: 'Invalid data'
        });
        return;
    }
    
    const newCat = req.body;
    newCat.filename = req.file.filename;
    try{
        //use req.user to add correct owner id
        const result = await catModel.insertCat(newCat);
        res.status(201).json({message: 'new cat added'});
    }catch(error){
        res.status(500).json({error: 500, message: error.message})
    }
    
};

const putCat = async (req, res) => {
    //console.log('modifying a cat', req.body)
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(), 
            message: 'Invalid PUT data'
        });
        return;
    }
    const cat = req.body;
    //TODO: before modifying a cat you should check that user is the owner of the cat (req.user.user_id == cat.owner)
    //can be done in catmodel
    try{
        const result = await catModel.modifyCat(cat);
        res.status(200).json({message: 'cat modified'});
    } catch(error){
        res.status(500).json({error: 500, message: error.message});
    }
};

const deleteCat = async (req, res) => {
    //console.log('deleting a cat', req.param.id)
    try{
        const result = await catModel.deleteCat(req.params.id);
        res.status(200).json({message: 'cat deleted'});
    } catch(error){
        res.status(500).json({error:500, message: error.message});
    }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat };
module.exports = catController;