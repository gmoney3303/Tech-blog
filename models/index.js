const User = require('./User'); // Import your User model
const Post = require('./Post'); // Import your Post model

// Define associations between models here
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // Example of an association where a user has many posts
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post }; // Export your models