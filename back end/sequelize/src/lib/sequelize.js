const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/database");

const sequelize = new Sequelize({
  username: dbConfig.MYSQL_USERNAME,
  password: dbConfig.MYSQL_PASSWORD,
  database: dbConfig.MYSQL_DB_NAME,
  port: dbConfig.MYSQL_PORT,
  dialect: "mysql",
});

//models
const User = require("../models/user")(sequelize);
const Post = require("../models/post")(sequelize); 
const Like = require("../models/like")(sequelize); 
const Comment = require("../models/comment")(sequelize); 
const Session = require("../models/session")(sequelize); 
const VerificationToken = require("../models/verification_token")(sequelize);


// 1 : M
Post.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "user_id" });

//Like 
//Post.belongsToMany(User, { through: Like}); 
//User.belongsToMany(Post, {througt:Like}); 
User.hasMany(Like, { foreignKey: "Id_User"}); 
Like.belongsTo(User, { foreignKey: "Id_User"}); 
Post.hasMany(Like, { foreignKey: "Id_Post"}); 
Like.belongsTo(Post, { foreignKey: "Id_Post"})

//Comment
// Post.belongsToMany(User, { through: Comment });
// User.belongsToMany(Post, { through: Comment });
User.hasMany(Comment, { foreignKey: "Id_User" });
Comment.belongsTo(User, { foreignKey: "Id_User" });
Post.hasMany(Comment, { foreignKey: "Id_Post" });
Comment.belongsTo(Post, { foreignKey: "Id_Post" });

//Session
Session.belongsTo(User, { foreignKey: "user_id" })
User.hasMany(Session, { foreignKey: "user_id" })

//Verification
VerificationToken.belongsTo(User, { foreignKey: "user_id" })
User.hasMany(VerificationToken, { foreignKey: "user_id" }) 

//CreatedAt 


module.exports = {
  sequelize,
  Post,
  User, 
  Comment, 
  Like, 
  Session, 
  VerificationToken,
};
