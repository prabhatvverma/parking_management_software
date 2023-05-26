import { body } from 'express-validator';
import adressSlotDetail from "../../models/ParkingDetail.js";
const slotValidation = [

    /**
     * VALIDATION TO BE APPLY ON ADDRESS
     */
    body("address")
        .not().isEmpty().withMessage("Please Enter Address").bail()
        .custom(async (value, { req }) => {
            const data = await adressSlotDetail.findOne({ userId: req.userData._id, address: value })
            if (data) {
                throw new Error("Adress is Already Registered With Same Name, Address Should Be Unique")
            }
        }).bail(),

    /**
     * VALIDATION TO BE APPLY ON TOTAL SLOTS
     */
    body("totalSlots")
        .not().isEmpty().trim().withMessage("Please Enter Total Available Slots").bail()

        .isInt().withMessage("Please Enter Slots In Number Formate").bail(),

    /**
     * VALIDATION TO BE APPLY ON PRICE
     */
    body("price")
        .not().isEmpty().trim().withMessage("Enter Price Of Slots").bail()
        .isNumeric().withMessage("Please Enter Price In Numaric Formate")
]

export default slotValidation;