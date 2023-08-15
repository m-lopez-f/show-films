// In src/services/userService.js

const Film = require("../database/Film");
const { v4: uuid } = require("uuid");

const getAllFilms = async (page) => {
  const allFilms = await Film.getAllFilms(page);
  return allFilms;
};

const getAllPopular = async (page) => {
  const films = await Film.getAllPopular(page);
  return films;
};

const getFilmCredits = async (filmId) => {
  const filmCredits = await Film.getFilmCredits(filmId);
  return filmCredits;
};

module.exports = {
  getAllFilms,
  getAllPopular,
  getFilmCredits
};