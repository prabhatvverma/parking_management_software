const bcrypt = require('bcrypt');
const User = require('../models/user');
const sendMail = require('../services/emailService');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { validationResult } = require('express-validator');

class usersController {

    /**
     * User Registraion With Validation  Result 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async signUp(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const password = await bcrypt.hash(req.body.password, 10);
            await User.create({
                name: req.body.fullName,
                email: req.body.email,
                address: req.body.address,
                phoneNo: req.body.phoneNo,
                password: password
            })
            const userData = await User.findOne(
                {
                    email: req.body.email
                }
            )
            const userId = userData._id.toHexString();
            const encryptedId = cryptr.encrypt(userId)
            const name = userData.name;
            const emailTO = userData.email;
            const emailFrom = "prabhat@gmail.com"
            let url = "http://localhost:3000/verify?_id=" + encryptedId
            sendMail({
                from: emailFrom,
                to: emailTO,

                subject: "Email Varification",
                text: `${emailFrom} shared you a link to verify this is you`,
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
            const _id = cryptr.decrypt(req.query._id)
            await User.updateOne({
                _id: _id
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
            res.status(200).json({ message: 'User Successfully Login' });
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }
}

module.exports = new usersController;