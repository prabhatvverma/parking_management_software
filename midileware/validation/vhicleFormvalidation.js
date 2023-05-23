import { body } from 'express-validator';

/**
 * VALIDATION FOR VEHICLE INFORMAITION STORING FORM
 * @OWNER_NAME MUST HAVE 4 CHARECTORS CAN NOT BE NULL
 * @VEHICLE_EMAIL NOT TO BE NULL MUST BE AN EMAIL
 * @VHICLE_PHONE_NO NOT TO BE NULL MUST BE A PHONE NO
 * @VEHICLE_TYPE NOT TO BE NULL 
 * @VEHICLE_NO NOT TO BE NULL MUST HAVE 4 CHARECTORS
 *  
 */

const vhicleFormValidation = [
    body("vehicleOwnerName")
        .not().isEmpty().trim().withMessage("Please Enter Your Name").bail()
        .isLength({ min: 4 }).trim().withMessage("Name must have atleast 4 cheractors").bail(),

    body("vehicleOwnerEmail")
        .not().isEmpty().withMessage("Please Enter Your Email").bail()
        .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/).withMessage("Please Enter Valid Email").bail(),
    // .isEmail().withMessage("Please Enter Valid Email").bail(),

    body("vehicleOwnerPhoneNo")
        .not().isEmpty().trim().withMessage("Please Enter PhoneNo").bail()
        .isMobilePhone().withMessage("Please Enter Valid PhoneNo")
        .isLength({ min: 10 }).withMessage("Phone No. Must Have 10 Digits").bail()
        .isLength({ max: 10 }).withMessage("Phone No. Does Not Have More Than 10 Digits").bail()
    ,
    body("vehicleType")
        .not().isEmpty().trim().withMessage("Please Enter VehicleType").bail(),

    body("vehicleNo")
        .not().isEmpty().trim().withMessage("Please Enter Vhicle No").bail()
        .isLength({ min: 4 })
]

export default vhicleFormValidation;