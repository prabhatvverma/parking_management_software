const bcrypt = require('bcrypt');
const User = require('../models/user');
const sendMail = require('../services/emailService');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { validationResult } = require('express-validator');
const secretkey = "khsdfjklhsdfklhl";

class usersController {
    /**
     * User Registraion With Validation  Result 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async signUp(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }        
            await User.create({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phoneNo: req.body.phoneNo,
                password: hashedPassword
            })
            const userData = await User.findOne(
                {
                    email: req.body.email
                }
            )
            const userId = userData._id.toHexString();
            const name = userData.name;
            const emailFrom = "parkingsoftware@debut.com"
            const emailTO = userData.email;
            let url = "http://localhost:3000/api/auth//verify?_id=" + userId
            sendMail({
                from: emailFrom,
                to: emailTO,
                subject: "Email Varification",
                html: 'Hii ' + name + ',please click here <a href="' + url + '">Verify</a> your mail'
            });
            res.status(200).json({ message: 'Please Check Your Email And Verify Your Email' });
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }

    /**
     *  User Email Varification if Varified Enter Current date and time 
     * @param {*} req 
     * @param {*} res 
     */
    async varifyEmail(req, res) {
        try {
            // const _id = cryptr.decrypt(req.query._id)
            const userDate = await User.findById(req.query._id)
            if (userDate.emailVerifiedAt != null) {
                return res.json({ Message: "Email Already Verified" })
            }
            await User.updateOne({
                _id: req.query._id
            },
                {
                    $set: { emailVerifiedAt: Date() }
                }
            );
            res.send({ Message: "email is verified" })
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }

    /**
     * User Login If details user is present in data else throw validation error 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async loginUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userData = await User.findOne({
                email: req.body.email
            })
            const userId = userData._id.toHexString();
            jwt.sign({ userId }, secretkey, { expiresIn: '300s' }, (err, token) => {
                console.log(err);
                res.status(200).json({ message: 'User Successfully Login' 
                ,token});
            })
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }
    /**
     * Forget Password Chech User Exist or not if exist next else show Invalid email
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async userforgetPassword(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.status(200).json({ message: 'User Successfully Login' });
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }
    /**
     * User Can Create New Password For User
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createNewPasswordForUser(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            User.findOneAndUpdate({
                email: req.body.email
            },
                { $set: { password: hashedPassword} })
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }
}

module.exports = new usersController;