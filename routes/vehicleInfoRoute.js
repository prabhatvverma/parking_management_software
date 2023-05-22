import { Router } from "express";
const router = Router()
import vehicleinfoController from '../controllers/vehicleInfoController.js';
import authentication from "../midileware/authentication/jwtAuth.js";
import vhicleFormValidation from "../midileware/validation/vhicleFormvalidation.js";
import validateFile from "../midileware/validationresult/validationResult.js";

/**
 * ROUTE TO STORE DATA OF COSTUMER IN DB
 */

router.use(authentication);
router.post('/',  vehicleinfoController.storeVhicleInfo);
router.post('/return', vehicleinfoController.returnVhicle);

export default router;