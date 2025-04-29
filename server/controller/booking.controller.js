const BookingModel = require("../model/booking.model");

module.exports.createBooking = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body) {
      const booking = await BookingModel.create(req.body);
      const populatedBooking = await booking.populate("userId");
      res
        .status(201)
        .json({
          message: "Booking created successfully",
          booking: populatedBooking
        });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
