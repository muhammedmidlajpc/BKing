const express = require("express");
const dbconnect = require("./config/dbconfig");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");
require("dotenv").config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(userRoutes);
app.use(bookingRoutes);

dbconnect();
app.listen(process.env.PORT, (err) => {
  console.log("server is running");
});
