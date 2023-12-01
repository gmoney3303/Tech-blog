// userRoutes.js

const express = require('express');
const router = express.Router();
const { User } = require('../../models'); // Import User model
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      uemail: req.body.email,
      password: hashedPassword,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log("start post");
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).json({ message: 'Incorrect username or password.' });
      return;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password.' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user: user, message: 'You are now logged in.' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
router.get('/', async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch user's details along with their associated posts
    const userData = await User.findByPk(userId, {
      attributes: ['id', 'name'], // Include necessary user attributes
      include: {
        model: Post,
        attributes: ['id', 'title', 'content', 'createdAt'], // Include necessary post attributes
        order: [['createdAt', 'DESC']], // Order posts by creation date (if needed)
      },
    });

    // Extract user's posts from userData and render the profile page
    const user = userData.get({ plain: true }); // Get plain object from Sequelize instance
    const posts = user.posts || []; // Assuming posts are associated as "posts"
    res.render('profile', {
      posts,
      logged_in: true,
      name: user.name, // Add user's name to display in the profile
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

module.exports = router;

