import { Router } from "express";
const router = Router()
import usersController from '../controllers/usersAuthController.js';
import { registrationValidation, loginValidation, forgetPassworvalidation, createNewPasswordValidation } from '../midileware/validation/userValidation.js';


router.post('/signup', registrationValidation,usersController.signUp);
router.post('/verify',  usersController.varifyEmail);
router.post('/login', loginValidation,usersController.loginUser)
router.post('/forget', forgetPassworvalidation,usersController.userforgetPassword);
router.post('/changepassword', createNewPasswordValidation,usersController.createNewPasswordForUser);
export default router;