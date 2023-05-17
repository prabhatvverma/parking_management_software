const router = require("express").Router();
const userAddressSlotController = require("../controllers/userAddress.SlotController")

router.post('/', userAddressSlotController.addAddressForSession);

module.exports = router;