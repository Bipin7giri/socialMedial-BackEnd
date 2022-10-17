const express = require('express');
const {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
  addLike,
  getNotification,
} = require('../controllers/postController');
const PostModel = require('../models/PostModel');
const router = express.Router();

// getall posts
router.get('/', getAllPosts);

// get postById
router.get('/userId/:email', getPostById);

// get notification
router.get('/notification/:email', getNotification);

// add post
router.post('/', addPost);

// add comment
router.put('/comment', addComment);
router.put('/like', addLike);

module.exports = router;
