import DailySession from "../models/adressSlotDetail.js";
import { validationResult } from 'express-validator';
import { messages,statusCode,response_status } from "../helpers/messegeStatusCode.js";
class userAddressSlotController {

    /**
     * ADDING NEW SLOTS AND ADDRESSES FOR USER 
     * @param {*} req 
     * @param {*} res 
     */

    async addAddressForSession(req, res) {
        const userId = req.userData._id
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await DailySession.create({
                userId: userId,
                address: req.body.address,
                totalSlots: req.body.totalSlots,
                price: req.body.price
            })
            res.status(statusCode.ok).json({ Message: messages.SlotCreated, ResponceCode: response_status.success })
        } catch (error) {
            res.status(401).json({ "error": error })
        }
    }

    /**
     * SHOW ALREADY CREATED SLOTS DETAILS 
     * @param {*} req 
     * @param {*} res 
     */

    async getAddress(req, res) {
        const userId = req.userData._id
        try {
            const allSlots = await DailySession.find({
                userId: userId
            })
            if (allSlots == null) {
                res.status(204).json({ Message: "No Address Are Created For That User" })
            }
            const address = [];
            allSlots.forEach(element => {
                address.push(element.address)
            });
            res.status(200).json({
                Message: "success",
                address
            })
        } catch (err) {
            res.status(401).send({ "err": err })
        }
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async showDetailsForSelectedSlot(req, res) {
        const userId = req.userData._id
        try {
            const data = await DailySession.findOne({
                userId: userId,
                address: req.body.address
            })
            console.log(data);
            if (data.activeAddress != "active") {
                await DailySession.updateOne({
                    userId: userId,
                    address: req.body
                },
                    {
                        $set: { activeAddress: "active" }
                    })
                res.status(201).json("Active Slot Is Opened")
            }
            // console.log(data.address, data.totalSlots, data.price);
            res.status(200).json({
                Message: "User LogedIn Again",
                Address: data.address,
                TotalSlots: data.totalSlots,
                PriceForAddress: data.price
            })

        } catch (error) {
            console.log(error);
            res.status(401).json({ "error": error })
        }
    }


}

export default new userAddressSlotController;