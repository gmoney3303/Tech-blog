const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User]
        }
      ],
    });

    const post = postData.get({ plain: true });
console.log(post.comments);
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }], // Ensure the User-Post association is correctly specified here
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.post('/create-post', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post using the Post model
    const newPost = await Post.create({
      title,
      content,
      user_id: req.session.user_id // Assuming you store the user ID in the session
    });

    // Redirect to the homepage or other desired page after post creation
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and delete it
    const deletedPost = await Post.destroy({
      where: { id: postId },
    });

    if (deletedPost) {
      // Post deleted successfully
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      // Post with the specified ID not found
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    // Error occurred while deleting the post
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

router.get('/post/:id/comments', async (req, res) => {
  try {
    const postId = req.params.id;
    
    // Assuming your Comment model has a relationship with the User model
    const comments = await Comment.findAll({
      where: { post_id: postId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']], // Order comments by creation date
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST route to add a comment to a specific post
router.post('/post/:id/comments', withAuth, async (req, res) => {
  try {
    // const {  postId, content } = req.body;
    // const postId = req.params.id;
    const userId = req.session.user_id; // Assuming user is authenticated
    console.log(userId,req.body);
    const newComment = await Comment.create({
      // content,
      ...req.body,
      user_id: userId,
      // post_id: postId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
