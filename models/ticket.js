var mongoose = require("../configs/init.config");
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
  seat_number: {
    type: String,
  },
  seat_discription:{
    type: String
  },
  booked: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    default: Date.now()
  },
});

var Tickets = mongoose.model("Ticket", ticketSchema);

module.exports = Tickets;