import ParkingDetail from "../models/ParkingDetail.js";
import { messages, statusCode, response_status } from "../helpers/messegeStatusCode.js";
import TicketHistory from "../models/TicketHistory.js";


/**
 * ADDING NEW SLOTS AND ADDRESSES FOR USER 
 * @param {*} req 
 * @param {*} res 
 */

const addAddress = async (req, res) => {
    try {
        req.body.userId = req.userData._id
        await ParkingDetail.create(req.body)
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

const getAddress = async (req, res) => {
    const userId = req.userData._id
    try {
        const allSlots = await ParkingDetail.find({
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
const showDetails = async (req, res) => {
    const userId = req.userData._id
    try {
        const data = await ParkingDetail.findOne({
            userId: userId,
            address: req.body.address
        })
        if (data == null) {
            res.status(statusCode.ok).json({
                message: messages.noAddress,
                ResponceCode: response_status.failure
            })
            return
        }
        // if (data.activeAddress != "active") {
        //     await ParkingDetail.updateOne(
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

        const amount = ticketHistorydata.reduce((initial, element) => {
            return initial + element.totalRent
        },0)
        res.status(statusCode.ok).json({
            Message: messages.SelectedAddressActive,
            ResponceStatus: response_status.success,
            Address: data.address,
            TotalSlots: data.totalSlots,
            PriceForAddress: data.price,
            TotalRevenuForThisAddress: amount
        })
    } catch (error) {
        console.log(error);
        res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
    }
}


export { addAddress, getAddress, showDetails };