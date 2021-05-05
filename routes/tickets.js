var express = require("express");
var router = express.Router();

/** imports */

const addSeat = require("../controllers/add_seat");
const bookTicket = require("../controllers/book_ticket");
const cancelTicket = require("../controllers/cancel_ticket");

router.post("/add-seat", addSeat.add);
router.post("/book", bookTicket.book);
router.post("/cancel", cancelTicket.cancel);

module.exports = router;
