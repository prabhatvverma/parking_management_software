const dailySession = require("../models/dailySession");
const jwtDecode = require('jwt-decode');
const { validationResult } = require('express-validator')


class userAddressSlotController {

    /**
     * User can Create Slots For Address 
     * @param {*} req 
     * @param {*} res 
     */
    async addAddressForSession(req, res) {
        const errors = validationResult(req);
        console.log(errors);
        const userData = await dailySession.create({
            userId: req.userData._id,
            address: req.body.address,
            totalSlots: req.body.totalSlots,
            price: req.body.price
        })
        console.log(userData);
       

    }
    /**
     * SHOW ALREADY CREATED SLOTS DETAILS 
     * @param {*} req 
     * @param {*} res 
     */
    async selectAddressForSession(req, res) {
        const userId = req.userData._id
        const allSlots = await dailySession.find({
            userId: userId
        })
        console.log(allSlots);
        // const addresses = allSlots.address;
        // console.log(addresses);
    }
    

}

module.exports = new userAddressSlotController;