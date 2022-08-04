const { DataTypes } = require("sequelize");

const Post = (sequelize) => {
  return sequelize.define("Post", { 
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // }, 
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    number_of_likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    }, 
    updatedAt: {
      type: DataTypes.DATE,
    }, 
    number_of_comments: {
      type: DataTypes.INTEGER, 
      defaultValue: 0,
    },
  })
};

module.exports = Post;
