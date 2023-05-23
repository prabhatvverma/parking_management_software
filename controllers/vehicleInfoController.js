import { messages, response_status, statusCode } from "../helpers/messegeStatusCode.js";
import adressSlotDetail from "../models/adressSlotDetail.js";
import Ticket from "../models/ticket.js";
import TicketHistory from "../models/ticketHistory.js";
import { } from 'dotenv/config'
class vehicleinfoController {
    /**
     * STORING COSTUMER VEHICLE INFO IN TICKETS TABLE STORE AND CREATE TICKET FOR USER
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    async storeVhicleInfo(req, res) {
        try {
            const totalSlotsCreated = await Ticket.count({     //to find the total slots that are created in tickets db
                slotId: req.body.slotId
            });
            const slotNo = totalSlotsCreated + 1                //used to store slot no in db ticket
            const ticketData = await Ticket.find(
                { slotId: req.body.slotId }
            )
            const totalUnparkedVehicle = ticketData.filter((eliment) => {
                return eliment.vehicleReturned_At != null                           //find out how many slots that have alrady return the carr and they are free
            })
            if (totalUnparkedVehicle.length > 0) {                  //if slots are free in ticket and alredy created in tickets table
                const vehicleData = await Ticket.findOneAndUpdate({
                    _id: totalUnparkedVehicle[0].id
                }, {
                    vehicleOwnerName: req.body.vehicleOwnerName,
                    vehicleOwnerEmail: req.body.vehicleOwnerEmail,
                    vehicleOwnerPhoneNo: req.body.vehicleOwnerPhoneNo,
                    vehicleType: req.body.vehicleType,
                    vehicleNo: req.body.vehicleNo,
                    vehicleEntered_At: Date(),
                    vehicleReturned_At: null,
                    vehicleTicket: req.body.vehicleNo + new Date().getTime(),
                }, { new: true })
                res.status(statusCode.createdSuccess).json({
                    Message: messages.vhicleInfoSaved,
                    ResponseStatus: response_status.success,
                    Parkingticket: vehicleData.vehicleTicket
                })
                return
            }
            const slotDetails = await adressSlotDetail.findById(
                req.body.slotId
            )
            if (slotDetails.totalSlots > totalSlotsCreated) {       //if slots are availble in slots table and all created slots re full in tickets table it will create new slot in tickets table
                const storeInfoOfVhicle = await Ticket.create({
                    slotId: req.body.slotId,
                    slotNo: slotNo,
                    vehicleOwnerName: req.body.vehicleOwnerName,
                    vehicleOwnerEmail: req.body.vehicleOwnerEmail,
                    vehicleOwnerPhoneNo: req.body.vehicleOwnerPhoneNo,
                    vehicleType: req.body.vehicleType,
                    vehicleNo: req.body.vehicleNo,
                    vehicleEntered_At: Date(),
                    vehicleTicket: req.body.vehicleNo + new Date().getTime(),
                })
                res.status(statusCode.createdSuccess).json({
                    Message: messages.vhicleInfoSaved,
                    ResponseStatus: response_status.success,
                    Parkingticket: storeInfoOfVhicle.vehicleTicket
                })
                return
            }
            res.status(statusCode.ok).json({            // if all the parking slots are full
                Message: messages.parkinFull,
                ResponseStatus: response_status.success
            })
        } catch (error) {
            res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
        }
    }
    /**
     * Module For vihcle return it will show total parking fee for vehicle vehcle 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async returnVhicle(req, res) {
        try {
            const slotData = await adressSlotDetail.findById(req.body.slotId);
            const vehicleData = await Ticket.findOneAndUpdate({ vehicleTicket: req.body.vehicleTicket }, {
                vehicleReturned_At: Date(),
                vehicleTicket: null
            }, { new: true });
            if (vehicleData) {
                const totalParkedVehicleTime = Math.floor(vehicleData.vehicleReturned_At - vehicleData.vehicleEntered_At) / (1000 * 60);
                if (totalParkedVehicleTime > process.env.INCREASE_CHARGES_AFTER_TIME) {
                    const finalPrice = slotData.price + (totalParkedVehicleTime - process.env.INCREASE_CHARGES_AFTER_TIME) * process.env.PRICE_INCREASED_BY
                    await TicketHistory.create(
                        {
                            userId: req.userData._id,
                            totalRent: finalPrice,
                            slotId: vehicleData.slotId,
                            slotNo: vehicleData.slotNo,
                            vehicleOwnerName: vehicleData.vehicleOwnerName,
                            vehicleOwnerEmail: vehicleData.vehicleOwnerEmail,
                            vehicleOwnerPhoneNo: vehicleData.vehicleOwnerPhoneNo,
                            vehicleNo: vehicleData.vehicleNo,
                            vehicleType: vehicleData.vehicleType,
                            vehicleTicket: req.body.vehicleTicket,
                            vehicleEntered_At: vehicleData.vehicleEntered_At,
                            vehicleReturned_At: vehicleData.vehicleReturned_At,
                        })
                    res.status(statusCode.ok).json({
                        Message: messages.unparkeVehcle,
                        ResponseCode: response_status.success,
                        vehcleRent: finalPrice
                    })
                    return
                }
                await TicketHistory.create({
                    userId: req.userData._id,
                    totalRent: slotData.price,
                    slotId: vehicleData.slotId,
                    slotNo: vehicleData.slotNo,
                    vehicleOwnerName: vehicleData.vehicleOwnerName,
                    vehicleOwnerEmail: vehicleData.vehicleOwnerEmail,
                    vehicleOwnerPhoneNo: vehicleData.vehicleOwnerPhoneNo,
                    vehicleNo: vehicleData.vehicleNo,
                    vehicleType: vehicleData.vehicleType,
                    vehicleTicket: req.body.vehicleTicket,
                    vehicleEntered_At: vehicleData.vehicleEntered_At,
                    vehicleReturned_At: vehicleData.vehicleReturned_At,
                })
                res.status(statusCode.ok).json({
                    Message: messages.unparkeVehcle,
                    ResponseCode: response_status.success,
                    vehcleRent: slotData.price
                })
                return
            }
            res.status(statusCode.bad_request).json({
                Message: messages.alreadyUnparked,
                ResponseCode: response_status.failure,
            })
        } catch (error) {
            console.log(error);
            res.status(statusCode.internal_server_error).json({ Message: error.messages, ResponseStatus: response_status.failure })
        }
    }
}

export default new vehicleinfoController;