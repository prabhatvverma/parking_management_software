const { body } = require('express-validator');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
/**
 * Validation Conditions For User Registration 
 */
const registrationValidation = [
    body("name")
        .not().isEmpty().trim().withMessage("Please Enter Your Name").bail()
        .isLength({ min: 4 }).trim().withMessage("Name must have atleast 4 cheractors").bail(),

    body("email")
        .not().isEmpty().trim().withMessage("Please Enter Your Email").bail()
        .isEmail().withMessage("Please Enter Valid Email").bail()
        .custom(async (value) => {
            const userData = await User.findOne({
                email: value
            })
            if (userData != null) {
                throw new Error("Email alredy exist")
            }
        }).bail(),
    body("phoneNo")
        .not().isEmpty().trim().withMessage("Please Enter Your Phone no.").bail()
        .isMobilePhone().withMessage("Please Eneter Valid Phone no.").bail(),

    body("address")
        .not().isEmpty().trim().withMessage("Please Enter Your Address").bail()
        .isLength({ min: 5 }).withMessage("Atleast 5 Charectors").bail(),

    body("password")
        .not().isEmpty().trim().withMessage("Please Enter Your Password").bail()
        .isLength({ min: 4 }).withMessage("Atleast 4 Charectors").bail(),
    body("cnfPassword").not().isEmpty().withMessage("Enter Password").bail()
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Please Enter Same Password");
            }
        })

];
/**
 * User Login Vlidation 
 * check email
 * Check If User Email Is Verfied Or Not
 * Check User Password Is Matched Or Not
 */
const loginValidation = [
    body("email")
        .not().isEmpty().trim().withMessage("Please Enter Your Email").bail()
        .isEmail().withMessage("Please Enter Valid Email").bail()
        .custom(async (value) => {
            const userData = await User.findOne({
                email: value
            })
            if (userData == null) {
                throw new Error("you Are Not Registered")
            }
            if(userData.emailVerifiedAt == null)
                throw new Error("Please verify your Email")     
        }).bail(),
    body("password")
        .not().isEmpty().trim().withMessage("Please Enter Your Password").bail()
        .custom(async (value, { req }) => {
            const userData = await User.findOne({
                email: req.body.email
            })
            if (userData) {
                const varifyPassword = await bcrypt.compare(value, userData.password)
                if (varifyPassword == false) {
                    throw new Error("Invalid email or password")
                }
            }
        }).bail(),
];
/**
 * Validation Check If The User Looking For CHange Password iS exxist Or not
 */
const forgetPassworvalidation = [
    body("email")
        .not().isEmpty().trim().withMessage("Please Enter Your Email").bail()
        .isEmail().withMessage("Please Enter Valid Email").bail()
        .custom(async (value) => {
            const userData = await User.findOne({
                email: value
            })
            if (userData == null) {
                throw new Error("Invalid Email")
            }
        }).bail()
]

/**
 * Simple Password Vlidation For User To Recreate User Password
 */
const CreateNewPasswordValidation = [
    registrationValidation[4]
]
module.exports = { registrationValidation, loginValidation, forgetPassworvalidation, CreateNewPasswordValidation };
// module.exports = loginValidation;

// export{ registrationValidation, loginValidation, forgetPassworvalidation, CreateNewPasswordValidation };