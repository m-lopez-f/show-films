fetch = require('node-fetch');
require('dotenv').config();

class HTTPResponseError extends Error {
	constructor(response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
	}
}

const throwApiCall = response => {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
}

const getAllFilms = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_FILMS}`
      }
    };
    const response = await fetch(url, options);

    try {
        const awatingResponse = throwApiCall(response);
        const body = await awatingResponse.json();
        return body;
    } catch (error) {
        console.error(error);
        const errorBody = await error.response.text();
        console.error(`Error body: ${errorBody}`);
        return errorBody;
    }
};

const getAllPopular = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_FILMS}`
      }
    };
    const response = await fetch(url, options);
    
    try {
        const awatingResponse = throwApiCall(response);
        const body = await awatingResponse.json();
        return body;
    } catch (error) {
        console.error(error);
        const errorBody = await error.response.text();
        console.error(`Error body: ${errorBody}`);
        return errorBody;
    }
};

const getFilmCredits = async (filmID) => {
  const url = `https://api.themoviedb.org/3/movie/${filmID}/credits?language=es-ES`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_FILMS}`
    }
  };
  const response = await fetch(url, options);
  
  try {
      const awatingResponse = throwApiCall(response);
      const body = await awatingResponse.json();
      return body;
  } catch (error) {
      console.error(error);
      const errorBody = await error.response.text();
      console.error(`Error body: ${errorBody}`);
      return errorBody;
  }
};

module.exports = {
    getAllFilms,
    getAllPopular,
    getFilmCredits
}