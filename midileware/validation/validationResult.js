import { validationResult } from "express-validator";

/**
 * THIS FUNCTION IS FOR GET VALIDATION RESULT (function for error store)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateFile = (req, res, next) => {

    const errors = validationResult(req)                      
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    next();
}

export default validateFile;