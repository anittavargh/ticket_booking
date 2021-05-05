const Ticket = require("../models/ticket");

/**
 * LOGIC BREAKDOWN
 * Get the number of seats for cancellation from the request body.
 * Check if the number of booked seats >= the number of seats given for cancellation.
 * If booked seats are greater, then find the ids of booked seats.
 * Mark the booked boolean to false of the seats(required number) that are booked.
 *
 */

module.exports.cancel = async (req, res, next) => {
  try {
    const numberOfSeatsForCancellation = req.body.cancel;

    const totalSeats = await Ticket.find();
    const bookedSeats = await Ticket.find({ booked: true });

    if (bookedSeats.length >= numberOfSeatsForCancellation) {
      const bookedSeatIds = bookedSeats.map((id) => id.seat_number);

      const seatIds = bookedSeatIds.slice(0, numberOfSeatsForCancellation);
      
      seatIds.map(async (id) => {
        await Ticket.updateOne({ seat_number: id }, { booked: false });
      });

      const booked = bookedSeats.length - seatIds.length;
      const seatsRemaining = totalSeats.length - booked;

      res.send({
        Status: 200,
        Message: "Success",
        Data: `booked: ${booked},remaining :${seatsRemaining}`,
      });
    } else {
      let booked = await Ticket.find({ booked: true });
      let seatsRemaining = totalSeats.length - booked.length;

      res.send({
        Status: 200,
        Message: "Declined",
        Data: `declined: ${numberOfSeatsForCancellation}, booked: ${booked.length}, remaining :${seatsRemaining}`,
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
