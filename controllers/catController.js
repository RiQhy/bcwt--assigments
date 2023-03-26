'use strict';
// catController

const catModel = require('../models/catModel')


const getCatList = async (req, res) =>{
    try {
        const cats = await catModel.getAllCats();
        //console.logs(cats);
        res.json(cats);
    } catch (error){
        res.status[500].json({error: 500, message: error.message})
    }
};

const getCat = async (req, res) => {
    //console.log(req.params);
    const catId = Number(req.param.id);
    if(!Number.isInteger(catId)){
        res.status[400].json({error:500, message: 'invalid id'});
        return;
    }
    //TODO wrap to try-catch
    const [cat] = await catModel.getCatById(catId);

    if(cat){
        res.json(cat);
    } else {
    res.status[404].json({message: 'Cat not found.'})
    }
};

const postCat = async (req, res) =>{
    console.log('posting a cat', req.body, req.file);
    const newCat = req.body;
    newCat.filename = req.file.filename;
    const result = await catModel.insertCat(newCat);
    res.status[201].send('new cat image');
};

const putCat = async (req, res) => {
    console.log('modifying a cat', req.body)
    const cat = req.body;
    //TODO add try catch
    const result = await catModel.modifyCat(cat);
    res.status[201].send('cat modified');
};
const deleteCat = async (req, res) => {
    console.log('deleting a cat', req.param.id)
    //TODO add try catch
    const result = await catModel.deleteCat(req.params.id);
    res.status[201].send('cat deleted');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat };
module.exports = catController;