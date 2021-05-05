const Ticket = require("../models/ticket");

/**
 * LOGIC BREAKDOWN
 * Add new seat for booking.
 * Add the seat number and seat description for it.
 */

module.exports.add = async (req, res, next) => {
  try {
    const seatNumber = req.body.seat_number;
    const seatDescription = req.body.seat_discription;

    const newSeat = {
      seat_number: seatNumber,
      seat_discription: seatDescription,
    };

    await new Ticket(newSeat).save();

    res.send({
      Status: 200,
      Message: "Success",
      Data: "New seat has been added for booking.",
    });
  } catch (err) {
    console.log(err);
    res.send({
      Status: 400,
      Message: "Error",
    });
  }
};
