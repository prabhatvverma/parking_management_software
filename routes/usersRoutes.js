import { Router } from "express";
const router = Router()
import usersController from '../controllers/usersAuthController.js';
import { registrationValidation, loginValidation, forgetPassworvalidation, createNewPasswordValidation } from '../midileware/validation/userValidation.js';
import validateFile from "../midileware/validationresult/validationResult.js";

router.post('/signup', registrationValidation, validateFile, usersController.signUp);
router.post('/verify', usersController.varifyEmail);
router.post('/login', loginValidation, validateFile, usersController.loginUser)
router.post('/forget', forgetPassworvalidation, validateFile, usersController.userforgetPassword);
router.post('/changepassword', createNewPasswordValidation, validateFile, usersController.createNewPasswordForUser);
export default router;