const router = require('express').Router()
const vehicleinfoController = require('../controllers/vehicleInfoController');

/**
 * ROUTE TO STORE DATA OF COSTUMER IN DB
 */
router.post('/', vehicleinfoController.storeVhicleInfo)

module.exports = router;