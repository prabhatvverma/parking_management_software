import { Router } from "express";
const router = Router()
import vehicleinfoController  from '../controllers/vehicleInfoController.js';

/**
 * ROUTE TO STORE DATA OF COSTUMER IN DB
 */
router.post('/', vehicleinfoController.storeVhicleInfo)

export default router;