const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// get routes

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getAdminProducts);

// post route

router.post('/add-product', adminController.postAddProduct);

module.exports = router;
