var express = require('express')
var router = express.Router();

/** imports */

const  allotedgiftsController = require('../controllers/MainController/DashboardController/AllotedGifts')
const availablegiftsController = require('../controllers/MainController/DashboardController/AvailableGifts')
const allocatenewgiftController = require('../controllers/MainController/DashboardController/AllocateNewGift');
const setdeliveredController = require('../controllers/MainController/DashboardController/SetDelivered')
const removegiftController = require('../controllers/MainController/DashboardController/RemoveGift')


router.get('/getall',allotedgiftsController.findAll)
router.get('/availablegifts',availablegiftsController.availableGifts)
router.post('/allocate/newgift',allocatenewgiftController.allocateNewGift)
router.post('/set/delivered',setdeliveredController.setdelivered)
router.post('/remove/gift',removegiftController.removegift);



module.exports = router;