const express = require("express"); 
const likesController = require("../controller/like");
const router = express.Router(); 


// router.get("/", postController.getAllPost); 

// router.get("/post/:id", likeController.addLike); 

router.post("/", likesController.addLikes ); 

// router.delete("/like/user/:Id_User/post/:id", likesController.addLikes); 

module.exports = router; 
