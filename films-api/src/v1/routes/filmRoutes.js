// In src/v1/routes/filmRoutes.js
const express = require("express");
const filmController = require("../../controllers/filmController");

const router = express.Router();

const checkLogin = require("../../middlewares/checkLogin");

router.get("/popular", checkLogin, filmController.getAllPopular);

router.get("/nowPlaying", checkLogin, filmController.getAllFilms);

router.get("/:filmId", checkLogin, filmController.getFilmCredits);

module.exports = router;