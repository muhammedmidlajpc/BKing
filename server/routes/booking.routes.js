const express = require("express");
const router = express.Router();
const bookinController = require("../controller/booking.controller");

router.post("/booking", bookinController.createBooking);

module.exports = router;
