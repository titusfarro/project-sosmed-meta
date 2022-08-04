const { DataTypes } = require("sequelize");

const Comment = (sequelize) => {
  return sequelize.define("Comment", {
    // com_id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    content: {
      type: DataTypes.STRING,
    }, 
     
    // createdAt: {
    //   type: DataTypes.DATE,
    // }, 
    // updatedAt: {
    //   type: DataTypes.DATE,
    // }, 
  });
};

module.exports = Comment;