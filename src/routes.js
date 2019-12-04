const express = require('express');
const router = express.Router();
const controller = require('./controllers/usersController');
const authMiddleware = require('./middlewares/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.use(authMiddleware);
router.get('/user/:id', controller.getUserById);

module.exports = router;