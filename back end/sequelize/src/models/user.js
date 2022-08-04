const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("User", { 
    // Id_User: {
    //   type: DataTypes.INTEGER, 
    //   allowNull:false, 
    //   primaryKey: true,
    //   autoIncrement: true,
      
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, 
    createdAt: {
      type: DataTypes.DATE,
    }, 
    updatedAt: {
      type: DataTypes.DATE,
    }, 
    
  });
};

module.exports = User;
