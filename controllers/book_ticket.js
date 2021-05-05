const Ticket = require("../models/ticket");

/**
 * LOGIC BREAKDOWN
 * Get the number of seats for booking from the request body.
 * Check if the number of not booked seats >= the number of seats given for booking.
 * If not booked seats are greater, then find the ids of not booked seats.
 * Mark the booked boolean to true of the seats(required number) that are not booked.
 *
 */

module.exports.book = async (req, res, next) => {
  try {
    const totalSeats = await Ticket.find();
    const numberOfRequiredSeats = req.body.book;

    const notBookedSeats = await Ticket.find({ booked: false });

    if (notBookedSeats.length >= numberOfRequiredSeats) {
      const notBookedSeatIds = notBookedSeats.map((id) => id.seat_number);
      const seatIds = notBookedSeatIds.slice(0, numberOfRequiredSeats);

      seatIds.map(async (id) => {
        await Ticket.findOneAndUpdate(
          { seat_number: id },
          { $set: { booked: true } }
        );
      });

      let booked = await Ticket.find({ booked: true });
      let seatsRemaining = totalSeats.length - booked.length;

      res.send({
        Status: 200,
        Message: "Success",
        Data: `booked: ${booked.length}, remaining :${seatsRemaining}`,
      });
    } else {
      let booked = await Ticket.find({ booked: true });
      let seatsRemaining = totalSeats.length - booked.length;

      res.send({
        Status: 200,
        Message: "Declined",
        Data: `declined: ${numberOfRequiredSeats}, booked: ${booked.length} , remaining :${seatsRemaining}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      Status: 400,
      Message: "Error",
    });
  }
};
