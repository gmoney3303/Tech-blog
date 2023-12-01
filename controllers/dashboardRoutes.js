const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET route for the dashboard
const isLoggedIn = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login'); // Redirect to the login page if the user is not logged in
  } else {
    next(); // Continue to the next middleware/route handler if the user is logged in
  }
};

// GET route for the dashboard
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch all blog posts created by the authenticated user
    const posts = await Post.findAll({ where: { user_id: userId } });

    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to load dashboard', details: error.message });
  }
});

// POST route to create a new blog post
router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content, user_id: req.session.user_id });
    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

router.post('/:postId/delete', async (req, res) => {
  try {
    const postId = req.params.postId;
    // Fetch the post by ID and delete it
    const deletedPost = await Post.destroy({ where: { id: postId } });

    if (deletedPost) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
module.exports = router;