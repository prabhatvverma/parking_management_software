import adressSlotDetail from "../models/adressSlotDetail.js";
import { messages, statusCode, response_status } from "../helpers/messegeStatusCode.js";
import TicketHistory from "../models/ticketHistory.js";
class userAddressSlotController {

    /**
     * ADDING NEW SLOTS AND ADDRESSES FOR USER 
     * @param {*} req 
     * @param {*} res 
     */

    async addAddressForSession(req, res) {
        const userId = req.userData._id
        try {
            await adressSlotDetail.create({
                userId: userId,
                address: req.body.address,
                totalSlots: req.body.totalSlots,
                price: req.body.price
            })
            res.status(statusCode.ok).json({ Message: messages.SlotCreated, ResponceCode: response_status.success })
        } catch (error) {
            res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
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
            const allSlots = await adressSlotDetail.find({
                userId: userId
            })
            if (allSlots.length <= 0) {
                res.status(statusCode.ok).json({
                    Message: messages.NoAddress,
                    ResponseStatus: response_status.failure
                })
                return
            }
            const allIdAddress = [];
            allSlots.forEach(({ _id, address }) => {
                allIdAddress.push({ _id, address })
            })
            // console.log();
            res.status(statusCode.ok).json({
                Message: messages.AllAddress,
                ResponceCode: response_status.success,
                Address: allIdAddress
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
            const data = await adressSlotDetail.findOne({
                userId: userId,
                address: req.body.address
            })
            // console.log(data);
            if (data == null) {
                res.status(statusCode.ok).json({
                    message: messages.noAddress ,
                    ResponceCode: response_status.failure
                })
                return
            }
            // if (data.activeAddress != "active") {
            //     await adressSlotDetail.updateOne(
            //         data,
            //         {
            //             $set: { activeAddress: "active" }
            //         })
            //     res.status(statusCode.createdSuccess).json({
            //         Message: messages.SelectedAddressActive,
            //         ResponceStatus: response_status.success,
            //         Address: data.address,
            //         TotalSlots: data.totalSlots,
            //         PriceForAddress: data.price
            //     })
            // }
            const ticketHistorydata = await TicketHistory.find({
                slotId: data._id
            })
            // console.log(ticketHistorydata);
            const totalRentForAddress = ticketHistorydata.filter((eliment) => {
                console.log();
                return eliment.totalRent != null                           //find out how many slots that have alrady return the carr and they are free
            })
            console.log(totalRentForAddress);
            res.status(statusCode.ok).json({
                Message: messages.SelectedAddressActive,
                ResponceStatus: response_status.success,
                Address: data.address,
                TotalSlots: data.totalSlots,
                PriceForAddress: data.price
            })
        } catch (error) {
            console.log(error);
            res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
        }
    }


}

export default new userAddressSlotController;