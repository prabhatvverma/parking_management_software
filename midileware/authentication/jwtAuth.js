import { verify } from 'jsonwebtoken';
import User from '../../models/user.js';


const isAuthenticated = async (req, res, next) => {
    try {
        let varificationToken;
        const token = req.headers.authorization;

        // check if bearer token exists or not.
        if (!token || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(491).json({
                message: "Autherisation token not Found"
            })
        }

        // verify JWT token(bearer token).
        try {
            const token = (req.headers.authorization).split(' ')[1]
            verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
                if (err) {
                    res.status(401).send({
                        err
                    })
                } else {
                    varificationToken = data
                    const user = await User.findById(varificationToken.userId);
                    // set user id in request.
                    req.userData = user;
                    next()
                }
            })
        } catch (error) {
            return res.json({
                error
            })
        }
    } catch (error) {
        console.log(error);
    }
};

export default isAuthenticated