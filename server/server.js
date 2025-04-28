const express = require("express");
const mongoose = require("mongoose");
const dbconnect = require("./config/dbconfig");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const app = express();

app.use(userRoutes);

dbconnect();
app.listen(process.env.PORT, (err) => {
  console.log("server is running");
});
