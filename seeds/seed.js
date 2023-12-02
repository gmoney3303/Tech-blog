const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Import the Comment model

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json'); // Assuming you have comment data

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  // Assuming the commentData contains an array of comments with associated post_id
  await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();