import ParkingDetail from "../models/ParkingDetail.js";
import { messages, statusCode, response_status } from "../helpers/messegeStatusCode.js";
import TicketHistory from "../models/TicketHistory.js";
import { ObjectId } from "bson";

/**
 * ADDING NEW SLOTS AND ADDRESSES FOR USER 
 * @param {*} req 
 * @param {*} res 
 */

const addAddress = async (req, res) => {
    try {
        req.body.userId = req.userData._id
        await ParkingDetail.create(req.body)
        return res.status(statusCode.ok).json({ Message: messages.SlotCreated, ResponceCode: response_status.success })
    } catch (error) {
        return res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
    }
}

/**
 * SHOW ALREADY CREATED SLOTS DETAILS 
 * @param {*} req 
 * @param {*} res 
 */

const getAddress = async (req, res) => {
    try {
        const userId = req.userData._id
        const allSlots = await ParkingDetail.find({
            userId: userId
        })
        if (allSlots.length <= 0) {
            return res.status(statusCode.ok).json({ Message: messages.NoAddress, ResponseStatus: response_status.failure })
        }
        const allIdAddress = [];
        allSlots.forEach(({ _id, address }) => {
            allIdAddress.push({ _id, address })
        })
        return res.status(statusCode.ok).json({ Message: messages.AllAddress, ResponceCode: response_status.success, Address: allIdAddress })
    } catch (err) {
        res.status(401).send({ "err": err })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const showDetails = async (req, res) => {
    try {
        const userId = req.userData._id;
        const data = await ParkingDetail.aggregate([
            { $match: { userId: userId, address: req.body.address } },
            {
                $lookup: {
                    from: "tickethistories",
                    localField: "_id",
                    foreignField: "slotId",
                    as: "ticketHistory"
                }
            },
            { $unwind: "$ticketHistory" }, // Unwind the ticketHistory array
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$ticketHistory.totalRent" }
                }
            }
        ]);
        if (data.length > 0) {
            const amount = data[0].totalAmount;
            return res.status(statusCode.ok).json({
                Message: messages.SelectedAddressActive,
                ResponceStatus: response_status.success,
                Address: data.address,
                TotalSlots: data.totalSlots,
                PriceForAddress: data.price,
                TotalRevenuForThisAddress: amount
            })
        } else {
            return res.status(statusCode.ok).json({ Message: messages.noTickets })
        }
    }
    catch (error) {
        console.log(error);
        res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
    }
}


export { addAddress, getAddress, showDetails };