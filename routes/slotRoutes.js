import { Router } from "express";
const router = Router()
import { addAddress, getAddress, showDetails } from "../controllers/slotController.js";
import authentication from "../midileware/authentication/jwtAuth.js";
import slotValidation from "../midileware/validation/slotValidation.js";
import validateFile from "../midileware/validation/validationResult.js"

router.use(authentication);
router.get('/getaddress',validateFile, getAddress);
router.post('/addslot', slotValidation,validateFile, addAddress);
router.post('/showdetails',showDetails )


export default router;
