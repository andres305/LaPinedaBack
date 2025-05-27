const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const categoryController = require('../controllers/categoryController');

// Ruta protegida para obtener platos
router.get('/dishes', dishController.getAllDishes);

// Ruta protegida para obtener categorías
router.get('/categories', categoryController.getAllCategories);

module.exports = router;