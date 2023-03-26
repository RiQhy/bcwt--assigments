'use strict';
// catRoute

const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/catController');

const upload = multer({next: '../uploads'});

router.get('/', catController.getCatList);
router.get('/:id', catController.getCat);
router.post('/', upload.single('/cat') ,catController.postCat);
router.put('/', catController.putCat);
router.delete('/:id', catController.deleteCat);

module.exports = router;