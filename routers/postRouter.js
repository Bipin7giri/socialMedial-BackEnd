const express = require('express');
const {
  getAllPosts,
  getPostById,
  addPost,
  addComment,
} = require('../controllers/postController');
const PostModel = require('../models/PostModel');
const router = express.Router();

// getall posts
router.get('/', getAllPosts);

// get postById
router.get('/userId/:email', getPostById);

// add post
router.post('/', addPost);

// add comment
router.put('/comment', addComment);
module.exports = router;
