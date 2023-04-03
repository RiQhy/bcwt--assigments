'use strict';


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = router;

router.get('/', userController.getUserList);
router.get('/:id', userController.getUser);
router.post('/', userController.postUser);
router.put('/', userController.putUser);
router.delete('/:id', userController.deleteUser);