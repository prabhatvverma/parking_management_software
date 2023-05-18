const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    sessionId: {
        type: Schema.Types.ObjectId,
        required: false
    },
    slotNo: {
        type: Number,
        required: false
    },
    vehicleOwnerName: {
        type: String,
        required: false
    },
    vehicleOwnerEmail:{
        type:String,
        required:false
    },
    vehicleOwnerPhoneNo:{
        type: BigInt,
        required: false
    },
    vehicleType: {
        type: String,
        enum: ['car','jeep'],
        default: 'null'
    },
    vehicleNo:{
        type: String,
        required: false,
    },
    VehicleEntered_At:{
        type: Date,
        required: false
    },
    vehicleReturned_At:{
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Ticket', ticketSchema);