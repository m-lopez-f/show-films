// In src/database/User.js
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllUsers = () => {
  return DB.users;
};

const getOneUser = (userId) => {
  const user = DB.users.find((user) => user.id === userId);
  if (!user) {
    return;
  }
  return user;
};

const findOne = (email) => {
  console.log(email)
  console.log(DB.users)
  const user = DB.users.find((user) => user.email === email);
  console.log(user)
  if (!user) {
    return;
  }
  console.log('continue')
  return user;
};

const createNewUser = (newUser) => {
  const isAlreadyAdded =
    DB.users.findIndex((user) => user.email === newUser.email) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `User with the email '${newUser.email}' already exists`,
    };
  }
  try {
    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneUser = (userId, changes) => {
  const indexForUpdate = DB.users.findIndex(
    (user) => user.id === userId
  );
  if (indexForUpdate === -1) {
    return;
  }
  const updatedUser = {
    ...DB.users[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }),
  };
  DB.users[indexForUpdate] = updatedUser;
  saveToDatabase(DB);
  return updatedUser;
};

const deleteOneUser = (userId) => {
  const indexForDeletion = DB.users.findIndex(
    (user) => user.id === userId
  );
  if (indexForDeletion === -1) {
    return;
  }
  DB.users.splice(indexForDeletion, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  findOne
};