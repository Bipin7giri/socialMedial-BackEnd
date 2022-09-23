const bcrypt = require('bcrypt');
const express = require('express');
const {
  register,
  getAllUsers,
  isLogin,
  addFollower,
} = require('../controllers/loginController');
const User = require('../models/UserModel');
const router = express.Router();

// signup route
router.post('/register', register);
router.get('/users/:email', getAllUsers);
router.post('/login', isLogin);

// followers route
router.post('/followers', addFollower);
module.exports = router;
