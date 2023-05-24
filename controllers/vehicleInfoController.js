import { messages, response_status, statusCode } from "../helpers/messegeStatusCode.js";
import ParkingDetail from "../models/ParkingDetail.js";
import Ticket from "../models/Ticket.js";
import TicketHistory from "../models/TicketHistory.js";
import { } from 'dotenv/config'

/**
 * STORING COSTUMER VEHICLE INFO IN TICKETS TABLE STORE AND CREATE TICKET FOR USER
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const parkVehicle = async (req, res) => {
    try {
        const totalSlotsCreated = await Ticket.count({ slotId: req.body.slotId });
        const ticketData = await Ticket.find({ slotId: req.body.slotId })
        const totalUnparkedVehicle = ticketData.filter((eliment) => {
            return eliment.vehicleReturned_At != null
        })
        req.body.parked_At = Date()
        req.body.vehicleTicket = req.body.vehicleNo + new Date().getTime()
        if (totalUnparkedVehicle.length > 0) {
            const vehicleData = await Ticket.findOneAndUpdate({
                _id: totalUnparkedVehicle[0].id
            }, req.body, { new: true })
            return res.status(statusCode.createdSuccess).json({
                Message: messages.vhicleInfoSaved, ResponseStatus: response_status.success,
                Parkingticket: vehicleData.vehicleTicket
            })
        }
        const slotDetails = await ParkingDetail.findById(req.body.slotId)
        if (slotDetails.totalSlots > totalSlotsCreated) {
            req.body.slotNo = totalSlotsCreated + 1
            const storeInfoOfVhicle = await Ticket.create(req.body)
            return res.status(statusCode.createdSuccess).json({
                Message: messages.vhicleInfoSaved, ResponseStatus: response_status.success,
                Parkingticket: storeInfoOfVhicle.vehicleTicket
            })
        }
        return res.status(statusCode.ok).json({            // if all the parking slots are full
            Message: messages.parkinFull,
            ResponseStatus: response_status.success
        })
    } catch (error) {
        return res.status(statusCode.internal_server_error).json({ messages: error.messages, ResponseStatus: response_status.failure })
    }
}
/**
 * Module For vehicle return it will show total parking fee for vehicle vehcle 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const unparkVehicle = async (req, res) => {
    try {
        const slotData = await ParkingDetail.findById(req.body.slotId);
        const vehicleData = await Ticket.findOneAndUpdate({ vehicleTicket: req.body.vehicleTicket }, {
            returned_At: Date(),
            vehicleTicket: null
        }, { new: true }).lean();
        if (vehicleData) {
            vehicleData.userId = req.userData._id
            vehicleData.vehicleTicket = req.body.vehicleTicket
            const totalParkedVehicleTime = Math.floor(vehicleData.returned_At - vehicleData.parked_At) / (1000 * 60);
            if (totalParkedVehicleTime > process.env.INCREASE_CHARGES_AFTER_TIME) {
                const finalPrice = slotData.price + (totalParkedVehicleTime - process.env.INCREASE_CHARGES_AFTER_TIME) * process.env.PRICE_INCREASED_BY
                vehicleData.totalRent = finalPrice
                await TicketHistory.create(vehicleData)
                return res.status(statusCode.ok).json({
                    Message: messages.unparkeVehcle, ResponseCode: response_status.success, vehcleRent: finalPrice
                })
            }
            vehicleData.totalRent = slotData.price
            await TicketHistory.create(vehicleData);
            return res.status(statusCode.ok).json({
                Message: messages.unparkeVehcle, ResponseCode: response_status.success, vehcleRent: slotData.price
            })
        }
        return res.status(statusCode.bad_request).json({
            Message: messages.alreadyUnparked, ResponseCode: response_status.failure,
        })
    } catch (error) {
        return res.status(statusCode.internal_server_error).json({ Message: error.messages, ResponseStatus: response_status.failure })
    }
}


export { parkVehicle, unparkVehicle };