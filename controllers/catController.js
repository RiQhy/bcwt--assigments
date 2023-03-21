'use strict';
// catController

const catModel = require('../models/catModel')


const cats = catModel.cats;

const getCatList = (req, res) =>{
    res.json(cats);
};
const getCat = (req, res) => {
    //console.log(req.params);
    const id = req.params.id;
    const filteredCats = cats.filter(cat =>  id == cat.id);
    if(filteredCats.length > 0){
        res.json(filteredCats[0]);
    } else {
    return res.sendStatus[404];
    }
};
const postCat = (req, res) =>{
    console.log('posting a cat', req.body, req.file);
    //res.status[200].send('uploads a cat image' + req.body.??);
};

const putCat = (req, res) => {
    res.send('From this endpoint you can modify a cat.');
};
const deleteCat = (req, res) => {
    res.send('From this endpoint you can delete a cat.');
};



const catController = {getCatList, getCat, postCat, putCat, deleteCat };
module.exports = catController;