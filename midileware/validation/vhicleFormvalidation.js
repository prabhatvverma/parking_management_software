const { body } = require('express-validator');

const vhicleFormValidation = [
    body(vehicleOwnerName)
        .not().isEmpty().trim().withMessage("Please Enter Your Name").bail()
        .isLength({ min: 4 }).trim().withMessage("Name must have atleast 4 cheractors").bail(),

    body(vehicleOwnerEmail)
        .not().isEmpty().trim().withMessage("Please Enter Your Email").bail()
        .isEmail().withMessage("Please Enter Valid Email").bail(),

    body(vehicleOwnerPhoneNo)
        .not().isEmpty().trim().withMessage("Please Enter PhoneNo").bail()
        .isMobilePhone().withMessage("Please Enter Valid PhoneNo")
    ,
    body(vehicleType)
    .not().isEmpty().trim().withMessage("Please Enter VehicleType").bail(),
    
    body(vehicleNo)
    .not().isEmpty().trim().withMessage("Please Enter Vhicle No").bail()
    .length({min: 4})
]

module.exports = vhicleFormValidation;