// In src/index.js
const express = require("express");
const v1FilmRouter = require("./v1/routes/filmRoutes");
const v1UserRouter = require("./v1/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/films", v1FilmRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});