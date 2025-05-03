const express = require('express');
const router = express.Router({ mergeParams: true });
const dishController = require('../controllers/dishController');

router.post('/', dishController.createDish);
router.get('/', dishController.getAllDishes);
router.get('/:dishId', dishController.getDishById);
router.put('/:dishId', dishController.updateDish);
router.delete('/:dishId', dishController.deleteDish);

module.exports = router;
