'use strict';
// catController

const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/image');

const getCatList = async (req, res) =>{
    try {
        const cats = await catModel.getAllCats();
        
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
    newCat.owner = req.user.user_id;
    await makeThumbnail(req.file.path, newCat.filename);

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
    cat.owner = req.user.user_id;
    if(req.params.id){
        cat.id = parseInt(req.params.id);
    }

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