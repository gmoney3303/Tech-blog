const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { Post, User } = require('../models'); // Assuming 'Post' and 'User' are your models

const seedDatabase = async () => {
  try {
    // Read the JSON data from postData.json and userData.json
    const postData = JSON.parse(fs.readFileSync(path.join(__dirname, 'postData.json'), 'utf-8'));
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'userData.json'), 'utf-8'));

    // Seed the database with user entries
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed the database with blog post entries
    await Post.bulkCreate(postData.map(post => ({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })));

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

seedDatabase();