import Ticket from "../models/ticket.js";

class vehicleinfoController {
    /**
     * STORING COSTUMER VEHICLE INFO IN TICKETS TABLE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    
    async storeVhicleInfo(req, res, next) {
        const storeInfoOfVhicle = new Ticket({
            vehicleOwnerName: req.body.name,
            vehicleOwnerEmail: req.body.email,
            vehicleOwnerPhoneNo: req.body.phoneNo,
            vehicleType: req.body.vehicleType,
            vehicleNo: req.body.vhicleNo,
            VehicleEntered_At: Date()
        })
        const info = await storeInfoOfVhicle.save();
        console.log(info);
        res.send("hello")
    }
}

export default new vehicleinfoController;