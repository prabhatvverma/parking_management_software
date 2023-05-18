const router = require("express").Router();
const userAddressSlotController = require("../controllers/userAddress.SlotController")
const authentication = require("../midileware/authentication/jwtAuth")
const slotValidation = require("../midileware/validation/userSlotValidation")

router.use(authentication);
router.post('/',slotValidation,userAddressSlotController.addAddressForSession);
router.post('/address', userAddressSlotController.selectAddressForSession);

module.exports = router;
