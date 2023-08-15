// In src/controllers/userController.js
const userService = require("../services/userService");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();

const generateAuthToken = (userData) => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1h to expiration token
    data: userData
  }, process.env.SECRET_KEY);
}

const createNewUser = async (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.email ||
    !body.password ||
    !body.birthdate ||
    !body.lastname
  ) {
    
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'email', 'password', 'birthdate', 'lastname'",
        },
      });
    return;
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const newUser = {
    name: body.name,
    email: body.email,
    password: await bcrypt.hash(body.password, salt),
  };

  try {
    const createdUser = userService.createNewUser(newUser);
    const jwt = generateAuthToken(newUser);
    createdUser.token = jwt;

    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const loginUser = async (req, res) => {
  try {

    const {email, password} = req.body;

    const user = await userService.findOne(email);

    if (!user){
      return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
      return res.status(400).send("Invalid email or password 2");
    }
    const finalData = generateAuthToken(user);
    user.token = finalData
    res.status(201).send({ status: "OK", data: user });
  } catch (error) {
      console.log(error);
      res.send("An error occured");
  }
};

module.exports = {
  createNewUser,
  loginUser
};