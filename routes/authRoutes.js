import { Router } from "express";
const router = Router()
import { signUp, verifyEmail, signin, forgetPass, forgetPassEmailVal, createNewPass } from '../controllers/authController.js';
import { registrationValidation, loginValidation, forgetPassworvalidation, createNewPasswordValidation } from '../midileware/validation/userValidation.js';
import validateFile from "../midileware/validation/validationResult.js";

router.post('/signup', registrationValidation, validateFile, signUp);
router.get('/verify', verifyEmail);
router.post('/signin', loginValidation, validateFile, signin)
router.post('/forget', forgetPassworvalidation, validateFile, forgetPass);
router.get('/forgetverify', forgetPassEmailVal);
router.post('/changepassword', createNewPasswordValidation, validateFile, createNewPass);
export default router;