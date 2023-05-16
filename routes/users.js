const router = require('express').Router();
const usersController = require('../controllers/usersController');
const validation = require('../midileware/userValidation');


router.post('/', validation.registrationValidation,usersController.signUp);
router.post('/verify',  usersController.varifyEmail);
router.post('/login', validation.loginValidation,usersController.loginUser)
router.post('/forget', validation.forgetPassworvalidation,usersController.userforgetPassword);
router.post('/changepassword', validation.CreateNewPasswordValidation,usersController.createNewPasswordForUser);
module.exports = router;