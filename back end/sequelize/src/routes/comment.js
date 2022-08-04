const express = require("express");
const router = express.Router();
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");

const { CommentController } = require("../controller");

router.get("/fetch/:Id_Post", CommentController.fetchComment);

router.post("/post", CommentController.postComment)


router.post("/post/:id/comment", CommentController.postComment); 


router.patch("/comment/:id", CommentController.editComment); 

router.patch("/comments/:id", CommentController.editComment)

router.delete("/:id", CommentController.deleteComment)

module.exports = router;