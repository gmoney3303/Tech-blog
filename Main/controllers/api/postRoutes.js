const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models'); // Import necessary models

// Define routes for blog posts

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }, { model: Comment }],
      order: [['createdAt', 'DESC']],
    });
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Define other routes for blog posts here...
router.get('/posts', async (req, res) => {
  try {
    // Fetch all posts or handle the logic here...
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a specific post by ID or handle the logic here...
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add routes for creating, updating, and deleting posts and comments...

module.exports = router;
