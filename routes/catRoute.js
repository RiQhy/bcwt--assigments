'use strict';
// catRoute

const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/catController');

const upload = multer({next: '../uploads'});

router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat') ,catController.postCat)
    .put(catController.putCat);
router.route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat);
module.exports = router;