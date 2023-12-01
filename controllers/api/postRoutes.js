const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    // Assuming req.session.user_id contains the logged-in user's ID
    const userId = req.session.user_id;

    // Fetch user's details along with their associated posts
    const userData = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, attributes: ['id', 'title'] }], // Ensure correct association and attributes are included
    });

    // Extract posts from userData and render the profile page
    const posts = userData.Posts || [];
    res.render('profile', {
      posts,
      logged_in: true, // Assuming the user is logged in
      name: userData.name, // Include user's name
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});



// POST route to create a new post
router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

const withAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (req.session.logged_in) {
    // If authenticated, proceed to the next middleware/route handler
    next();
  } else {
    // If not authenticated, redirect or send an error response
    res.status(401).json({ message: 'Unauthorized' });
  }
};
// Other routes for fetching specific posts, updating, deleting, etc.


module.exports = router;