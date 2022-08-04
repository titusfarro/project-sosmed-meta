const { DataTypes } = require("sequelize");

const Like = (sequelize) => {
  return sequelize.define("Like", {
    // likes_id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // }, 
    // createdAt: {
    //   type: DataTypes.DATE,
    // }, 
    // updatedAt: {
    //   type: DataTypes.DATE,
    // },
  });
};

module.exports = Like;