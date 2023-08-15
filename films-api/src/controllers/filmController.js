// In src/controllers/filmController.js
const filmService = require("../services/filmService");

const getAllFilms = async (req, res) => {
  const {
    params: {  page = 1  },
  } = req;

  try {
    const allFilms = await filmService.getAllFilms(page);
    res.send({ status: "OK", data: allFilms });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllPopular = async (req, res) => {
  const {
    params: { page = 1 },
  } = req;
  console.log('PELIS POPULAR')
  try {
    const allFilms = await filmService.getAllPopular(page);
    res.send({ status: "OK", data: allFilms });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getFilmCredits = async (req, res) => {
  const {
    params: { filmId },
  } = req;
  if (!filmId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "Need film ID",
        },
      });
  }
  const film = await filmService.getFilmCredits(filmId);
  res.send({ status: "OK", data: film });
};

module.exports = {
  getAllFilms,
  getAllPopular,
  getFilmCredits
};