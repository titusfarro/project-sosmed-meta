const express = require("express");
const router = express.Router(); 
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware")

const { userController } = require("../controller");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.patch("/:id", userController.editUser); 

router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin); 

router.patch("/verify/:verToken", userController.verifyUser)

module.exports = router;
