const dailySession = require("../models/dailySession");

class userAddressSlotController {
    async addAddressForSession(req,res){
        const userData = await dailySession.create({
            address:req.body.address,
            totalSlots: req.body.totalSlots,
            price: req.body.price
        })
        console.log(userData);
    }
}

module.exports = new userAddressSlotController;