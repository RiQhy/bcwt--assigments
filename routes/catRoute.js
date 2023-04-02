'use strict';
// catRoute

const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/catController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb (null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({dest: 'uploads/', fileFilter});

router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat') , 
        body('name').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),  
        body('birthdate').isDate(),
        body('weight').isFloat({min:0.1, max:50}),
        body('owner').isInt({min:1}),
        catController.postCat
    )
    .put(
        body('name').isAlphanumeric().isLength({min: 1, max: 30}),  
        body('birthdate').isDate(),
        body('weight').isFloat({min:0.1, max:50}),
        body('owner').isInt({min:1}),
        catController.putCat
    );

router.route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat);

module.exports = router;