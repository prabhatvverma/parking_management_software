import { verify } from 'jsonwebtoken';
import User from '../../models/User.js';
import { messages, statusCode } from '../../helpers/messegeStatusCode.js';
// import returnResponse from "../services/response.js";

/**
 * authenticat user login or not
  @param {} req 
  @param {} res 
  @param {} next 
 * @returns 
 */
const isAuthenticated = async (req, res, next) => {
    try {
        let isVerified;
        let token = req.headers.authorization;

        // check if bearer token exists or not.
        if (!token || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(statusCode.bad_request).json({ Message: messages.jwtError })
        }
        // verify JWT token(bearer token).
        token = (req.headers.authorization).split(' ')[1]
        verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
            if (err) {
                return res.status(statusCode.bad_request).json({ Messages: err.message });
            } else {
                isVerified = data
                const user = await User.findById(isVerified.userId);
                // set user id in request.
                req.userData = user;
                next()
            }
        })

    } catch (error) {
        return res.status(statusCode.bad_request).json({ Messages: error.message })
    }
};

export default isAuthenticated