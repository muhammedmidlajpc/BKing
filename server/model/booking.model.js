const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String ,
      required: true
    },
    purpose: {
      type: String
    }
  },
  { timestamps: true }
);
const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
