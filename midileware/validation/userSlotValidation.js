const { body } = require('express-validator');
const DailySession = require("../../models/dailySession");
const slotValidation = [

    /**
     * VALIDATION TO BE APPLY ON ADDRESS
     * NOT TO BE NULL
     * ADDRESS MUST BE UNIQUE
     */
    body("address")
        .not().isEmpty().withMessage("Please Enter Address").bail()
        .custom(async (value, { req }) => {
            const data = await DailySession.find(
                {
                    userId: req.userData._id,
                    address: value
                }
            )
            console.log(data);
            if (data) {
                throw new Error("Adress is Already Registered With Same Name, Adress Should Be Unique")
            }
        }).bail(),

    /**
     * VALIDATION TO BE APPLY ON TOTAL SLOTS
     * NOT TO BE NULL
     * SHOULD BE INTEGER TYPE
     */
    body("totalSlots")
        .not().isEmpty().trim().withMessage("Please Enter Slots").bail()
        .isInt().withMessage("Please Enter Slots In Number Formate").bail(),
    
    /**
     * VALIDATION TO BE APPLY ON PRICE
     * NOT TO BE NULL
     * SHOULD BE INTEGER TYPE
     */
    body("price")
        .not().isEmpty().trim().withMessage("Enter Price Of Slots").bail()
        .isNumeric().withMessage("Please Enter Price In Numaric Formate")
]

module.exports = slotValidation;