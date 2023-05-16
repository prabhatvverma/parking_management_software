const { body } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const registrationValidation = [
    body("fullName")
        .not().isEmpty().trim().withMessage("Please Enter Your Name").bail()
        .isLength({ min: 3 }).trim().withMessage("Name must have atleast 4 cheractors").bail(),

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
        .isLength({ min: 4 }).withMessage("Atleast 4 Charectors").bail()

]

const loginValidation = [
    body("email").isEmpty().trim().withMessage("Please Enter Your Email").bail()
        .isEmail().withMessage("Please Enter Valid Email").bail()
        .custom(async (value) => {
            const userData = await User.findOne({
                email: value
            })
            if (userData = null) {
                throw new Error("Invalid email or password")
            }
        }).bail(),
    body("password")
        .not().isEmpty().trim().withMessage("Please Enter Your Password").bail()
        .isLength({ min: 4 }).withMessage("Atleast 4 Charectors").bail()
        .custom(async (value, { req }) => {
            const userData = await User.findOne({
                email: req.body.eamil
            })
            if (userData) {
                const varifyPassword = await bcrypt.compare(value, userData.password)
                if (verfication == false) {
                    throw new Error("Invalid email or password")
                }
            }
        }).bail(),
    body("emailVerifiedAt")
        .custom(async (value, { req }) => {
            const userData = await User.findOne({
                email: req.body.email
            })
            if (userData) {
                if (userData == null) {
                    return
                }
                if (await bcrypt.compare(req.body.password, userData.password) == false) {
                    return
                }
                if (userData.emailVerifiedAt == null) {
                    throw new Error("Please verify your Email")
                }
            }
        }).bail()


]
module.exports = { registrationValidation, loginValidation };