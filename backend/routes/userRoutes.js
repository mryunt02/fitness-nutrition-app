// filepath: /Users/bugrahanyunt/Developer/fitness-nutrition-app/backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.authenticateUser);
router.get('/:id', protect, userController.getUserById);

module.exports = router;
