import { Router } from "express";
const router = Router()
import userAddressSlotController from "../controllers/userAddress.SlotController.js";
import authentication from "../midileware/authentication/jwtAuth.js";
import slotValidation from "../midileware/validation/userSlotValidation.js";

router.use(authentication);
router.get('/', userAddressSlotController.getAddress);
router.post('/addslot', slotValidation, userAddressSlotController.addAddressForSession);
router.post('/showdetails', userAddressSlotController.showDetailsForSelectedSlot)
export default router;
