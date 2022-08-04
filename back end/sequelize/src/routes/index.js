const postRoutes = require("./post");
const userRoutes = require("./user"); 
const commentRoutes = require("./comment"); 
const likeRoutes = require("./like")
// const userMongoRoutes = require("./user_mongo");
// const todoMongoRoutes = require("./todo_mongo");
// const postMongoRoutes = require("./post_mongo");
module.exports = {
  postRoutes,
  userRoutes,
  commentRoutes, 
  likeRoutes,
  // userMongoRoutes,
  // todoMongoRoutes,
  // postMongoRoutes,
};
