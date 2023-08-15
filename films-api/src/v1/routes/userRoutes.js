// In src/v1/routes/userRoutes.js
const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router.post("/register", userController.createNewUser);

router.post("/login", userController.loginUser)

module.exports = router;