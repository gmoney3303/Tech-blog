const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id', // Assuming 'user_id' is the foreign key in the 'Post' model referencing 'User'
    });
  }
}
Post.init(
  {
    // Define your Post model attributes here
    // For example:
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // ... other attributes
  },
  {
    sequelize,
    modelName: 'posts', // This should match the table name in your database
  }
);

module.exports = Post;
