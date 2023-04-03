'use strict';
// catController

const catModel = require('../models/catModel')


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
        res.status(500).json({error: 500, message: error.message})
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
        res.status(404).json({error:500, message: error.message});
    }
};

const postCat = async (req, res) =>{
    console.log('posting a cat', req.body, req.file);
    const newCat = req.body;
    newCat.filename = req.file.filename;
    try{
        const result = await catModel.insertCat(newCat);
        res.status(201).json({message: 'new cat image'});
    }catch(error){
        res.status(500).json({error: 500, message: error.message})
    }
    
};

const putCat = async (req, res) => {
    //console.log('modifying a cat', req.body)
    const cat = req.body;
    try{
        const result = await catModel.modifyCat(cat);
        res.status(200).json({message: 'cat modified'});
    } catch(error){
        res.status(200).json({error: 500, message: error.message});
    }
};

const deleteCat = async (req, res) => {
    //console.log('deleting a cat', req.param.id)
    try{
        const result = await catModel.deleteCat(req.params.id);
        res.status(200).json({message: 'cat deleted'});
    } catch(error){
        res.status(200).json({error:500, message: error.message});
    }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat };
module.exports = catController;