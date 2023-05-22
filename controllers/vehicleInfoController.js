import { messages, response_status, statusCode } from "../helpers/messegeStatusCode.js";
import adressSlotDetail from "../models/adressSlotDetail.js";
import Ticket from "../models/ticket.js";

class vehicleinfoController {
    /**
     * STORING COSTUMER VEHICLE INFO IN TICKETS TABLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    async storeVhicleInfo(req, res, next) {
        try {
            const totalSlotsCreated = await Ticket.count({
                slotId: req.body.slotId
            });
            const slotNo = totalSlotsCreated + 1
            const ticketData = await Ticket.find(
                { slotId: req.body.slotId }
            )
            const totalUnparkedVehicle = ticketData.filter((eliment) => {
                return eliment.vehicleReturned_At != null
            })
            if (totalUnparkedVehicle.length > 0) {
                await Ticket.updateOne({
                    _id: totalUnparkedVehicle[0].id
                }, {
                    vehicleOwnerName: req.body.vehicleOwnerName,
                    vehicleOwnerEmail: req.body.vehicleOwnerEmail,
                    vehicleOwnerPhoneNo: req.body.vehicleOwnerPhoneNo,
                    vehicleType: req.body.vehicleType,
                    vehicleNo: req.body.vehicleNo,
                    VehicleEntered_At: Date(),
                    vehicleReturned_At: null
                })
                res.status(statusCode.createdSuccess).json({
                    Message: messages.vhicleInfoSaved,
                    ResponseStatus: response_status.success,
                    Parkingticket: totalUnparkedVehicle[0].id
                })
                return
            }
            const slotDetails = await adressSlotDetail.findById(
                req.body.slotId
            )
            if (slotDetails.totalSlots > totalSlotsCreated) {
                const storeInfoOfVhicle = new Ticket({
                    slotId: req.body.slotId,
                    slotNo: slotNo,
                    vehicleOwnerName: req.body.vehicleOwnerName,
                    vehicleOwnerEmail: req.body.vehicleOwnerEmail,
                    vehicleOwnerPhoneNo: req.body.vehicleOwnerPhoneNo,
                    vehicleType: req.body.vehicleType,
                    vehicleNo: req.body.vehicleNo,
                    VehicleEntered_At: Date(),
                })
                const tickedata = await storeInfoOfVhicle.save();
                res.status(statusCode.createdSuccess).json({
                    Message: messages.vhicleInfoSaved,
                    ResponseStatus: response_status.success,
                    Parkingticket: tickedata
                })
                return
            }
            res.status(statusCode.ok).json({
                Message: messages.parkinFull,
                ResponseStatus: response_status.success
            })
        } catch (error) {
            res.status(statusCode.internal_server_error).json({ error, ResponseStatus: response_status.failure })
        }
    }

    async returnVhicle(req, res, next) {
        const slotData = await adressSlotDetail.findById(req.body.slotId);
        const price = slotData.price
        const VhicleParkingData = await Ticket.findById(req.body.id);
        const totalTime = Math.floor(VhicleParkingData.vehicleReturned_At - VhicleParkingData.VehicleEntered_At) / (1000 * 60);
        console.log(totalTime);
        if (totalTime > 60) {
            const data = totalTime-60*2
            console.log(data);
        }
        await Ticket.findByIdAndUpdate(
            req.body.id, {

        })
    }
}

export default new vehicleinfoController;