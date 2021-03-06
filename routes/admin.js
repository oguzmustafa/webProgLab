const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const locals = require('../middleware/locals');

const adminController = require('../controllers/admin');

router.get('/products', locals, isAdmin, adminController.getProducts);

router.get('/add-product', locals, isAdmin, adminController.getAddProduct);

router.post('/add-product', locals, isAdmin, adminController.postAddProduct);

router.get('/products/:productid', locals, isAdmin, adminController.getEditProduct);

router.post('/products', locals, isAdmin, adminController.postEditProduct);

router.get('/bayi',locals,isAdmin,adminController.getBayi);

router.get('/add-bayi',locals,isAdmin,adminController.getAddBayi);

router.post('/add-bayi',locals,isAdmin,adminController.postAddBayi);

router.get('/bayi/:bayi',locals,isAdmin,adminController.getEditBayi);

router.post('/bayi',locals,isAdmin,adminController.postEditBayi);

router.post('/delete-product', locals, isAdmin, adminController.postDeleteProduct);

router.post('/delete-bayi', locals, isAdmin, adminController.postDeleteBayi);

router.get('/add-category', locals, isAdmin, adminController.getAddCategory);

router.post('/add-category', locals, isAdmin, adminController.postAddCategory);

router.get('/categories', locals, isAdmin, adminController.getCategories);

router.get('/categories/:categoryid', locals, isAdmin, adminController.getEditCategory);

router.post('/categories', locals, isAdmin, adminController.postEditCategory);

router.post('/delete-category', locals, isAdmin, adminController.postDeleteCategory);

module.exports = router;   