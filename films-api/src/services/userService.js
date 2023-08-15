// In src/services/userService.js

const User = require("../database/User");
const { v4: uuid } = require("uuid");

const findOne = (email) => {
  console.log('Service')
  console.log(email)
  const user = User.findOne(email);
  return user;
};

const createNewUser = (userData) => {
  const userToInsert = {
    ...userData,
    id: uuid(),
    createdAt: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }),
    updatedAt: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }),
  };

  try {
    const createdUser = User.createNewUser(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createNewUser,
  findOne
};