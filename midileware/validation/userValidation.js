import { body } from 'express-validator';
import User from '../../models/User.js';
import { compare } from 'bcrypt';
/**
 * Validation Conditions For User Registration 
 */
const registrationValidation = [
    /**
     * VALIDATION TO BE APPLY ON NAME
     * NOT TO BE NULL
     * MIN LENGTH MUST BE 4
     */

    body("name")
        .not().isEmpty().trim().withMessage("Please Enter Your Name").bail()
        .isLength({ min: 4 }).trim().withMessage("Name must have atleast 4 charecters").bail()
        .matches(/^[A-Za-z\s]+$/).withMessage("Numbers & Special charecters Are Not Allowed").bail()
        .isLength({ max: 20 }).trim().withMessage("Name can not have more than 20 charecters").bail(),

    /**
     * VALIDATION TO BE APPLY ON NAME
     * NOT TO BE NULL
     * MUST BE AN EMAIL
     * NOT TO ALREADY REGISTERED
     */

    body("email")
        .not().isEmpty().trim().withMessage("Please Enter Your Email").bail()
        // .isEmail().withMessage("Please Enter Valid Email").bail()
        .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/).withMessage('Please Enter Valid Email').bail()
        
        .custom(async (value) => {
            const userData = await User.findOne({
                email: value
            })
            if (userData != null) {
                throw new Error("Email alredy exist")
            }
            
        }).bail(),

    /**
     * VALIDATION TO BE APPLYED ON PHONE NO 
     * NOT TO MBE NULL
     * MUST BE A PHONE NO 
     */
    body("phoneNo")
        .not().isEmpty().trim().withMessage("Please Enter Your Phone no.").bail()
        .isLength({ min: 10 }).withMessage("Phone No. Must Have 10 Digits").bail()
        .isLength({ max: 10 }).withMessage("Phone No. Does Not Have More Than 10 Digits").bail()
        .isMobilePhone().withMessage("Please Eneter Valid Phone no.").bail(),

    // VALIDATION ON ADDRESS    
    body("address")
        .not().isEmpty().trim().withMessage("Please Enter Your Address").bail()
        .isLength({ min: 5 }).withMessage("Atleast 5 charecters").bail()
        .isLength({ max: 25 }).withMessage("Address Can Not Have More Than 25 Words")
    ,

    //VALIDATION APPLYED ON PASSWORD    
    body("password")
        .not().isEmpty().trim().withMessage("Please Enter Your Password").bail()
        .isLength({ min: 4 }).withMessage("Atleast 4 charecters").bail(),

    // VALIDATION FRO CONFERM PASSWORD
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
        .not().isEmpty().withMessage("Please Enter Your Email").bail()
        .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/).withMessage('Please Enter Valid Email').bail()
        .custom(async (value) => {
            const userData = await User.findOne({
                email: value
            })
            if (userData == null) {
                throw new Error("you Are Not Registered")
            }
            if (userData.emailVerifiedAt == null)
                throw new Error("Please verify your Email")
        }).bail(),
    body("password")
        .not().isEmpty().trim().withMessage("Please Enter Your Password").bail()
        .isLength({ min: 4 }).withMessage("Atleast 4 charecters").bail()
        .custom(async (value, { req }) => {
            const userData = await User.findOne({
                email: req.body.email
            })
            if (userData) {
                const varifyPassword = await compare(value, userData.password)
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
        .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/).withMessage('Please Enter Valid Email').bail()
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
const createNewPasswordValidation = [
    body("password")
        .not().isEmpty().trim().withMessage("Please Enter Your Password").bail()
        .isLength({ min: 4 }).withMessage("Atleast 4 charecters").bail(),

    body("cnfPassword").not().isEmpty().withMessage("Enter Password").bail()
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Please Enter Same Password");
            }
        })

]


export { registrationValidation, loginValidation, forgetPassworvalidation, createNewPasswordValidation };
// module.exports = loginValidation;

// export{ registrationValidation, loginValidation, forgetPassworvalidation, CreateNewPasswordValidation };