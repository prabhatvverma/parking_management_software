import { } from 'dotenv/config'
import { hash } from 'bcrypt';
import User from '../models/user.js';
import sendMail from '../services/emailService.js';
import sign from 'jsonwebtoken';
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
import { messages, response_status, statusCode } from '../helpers/messegeStatusCode.js'

class usersController {
    /**
     * User Registraion With Validation  Result 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async signUp(req, res, next) {
        const hashedPassword = await hash(req.body.password, 10);
        try {
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
            //SENDING VARIFICATION EMAIL
            const userId = userData._id.toHexString();
            const encryptedId = cryptr.encrypt(userId);
            const name = userData.name;
            const emailFrom = process.env.EMAIL_FROM
            const emailTO = userData.email;
            let url = process.env.BASE_URL + `/api/auth/verify?_id=` + encryptedId
            console.log(url);
            sendMail({
                from: emailFrom,
                to: emailTO,
                subject: "Email Varification",
                html: 'Hii ' + name + ',please click here <a href="' + url + '">Verify</a> your mail'
            });
            res.status(statusCode.ok, response_status.success).json({ message: messages.emailSentCuccessfully, Response: response_status.success });
        } catch (error) {
            
            res.status(statusCode.bad_request).json({ "error": error })
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
            const userDate = await findById(_id)
            if (userDate.emailVerifiedAt != null) {
                return res.status(statusCode.ok).json({ Message: messages.emailAlreadyVerified, Response: response_status.success })
            }
            await User.updateOne({
                _id: _id
            },
                {
                    $set: { emailVerifiedAt: Date() }
                }
            );
            res.status(statusCode.ok).json({ Message: messages.emailVarified, Response: response_status.success})
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
            const userData = await User.findOne({
                email: req.body.email
            })
            const userId = userData._id.toHexString();
            sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                console.log(err);
                res.status(200).json({
                    message: messages.LoginSuccess
                    ,JswToken: token
                });
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
            //SENDING EMAIL TO USER TO RESET HIS PASSWOORD
            const encryptedEmail = cryptr.encrypt(req.body.email);
            let url = process.env.BASE_URL + `/api/auth/changepassword?email=` + encryptedEmail
            sendMail({
                from: process.env.EMAIL_FROM,
                to: req.body.email,
                subject: "Forget Password",
                html: 'Hii ' + req.body.email + ',please click here <a href="' + url + '">Reset</a> your Password'
            });
            res.status(statusCode.ok).json({ message: messages.emailToResetPassword, response_status: response.success });
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
        const email = cryptr.decrypt(req.query.email)
        const hashedPassword = await hash(req.body.password, 10);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            findOneAndUpdate({
                email: email
            },
                { $set: { password: hashedPassword } })
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }
}

export default new usersController;