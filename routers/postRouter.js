const express = require('express');
const {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
  addLike,
  getNotification,
} = require('../controllers/postController');
const jwt = require('jsonwebtoken');

const jwtToken = require('../generateAccessToken');
const PostModel = require('../models/PostModel');
const router = express.Router();

// getall posts
router.get('/', getAllPosts);

// get postById
router.get('/userId/:email', getPostById);

// get notification
router.get('/notification/:email', getNotification);

// add post
router.post('/', tokenValidation, addPost);

// middleware for tokenValidation
function tokenValidation(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.send('invalid user');
  }
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send('invalid user');
    req.user = user;
    next();
  });
}

// add comment
router.put('/comment', addComment);
router.put('/like', addLike);

module.exports = router;
