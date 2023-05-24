import { Router } from "express";
const router = Router()
import { parkVehicle, unparkVehicle } from '../controllers/vehicleInfoController.js';
import authentication from "../midileware/authentication/jwtAuth.js";
import vhicleInfoValidation from "../midileware/validation/vhicleInfovalidation.js";
import validateFile from "../midileware/validation/validationResult.js";

/**
 * ROUTE TO STORE DATA OF COSTUMER IN DB
 */

router.use(authentication);
router.post('/parking', vhicleInfoValidation, validateFile, parkVehicle);
router.post('/unparking', unparkVehicle);

export default router;