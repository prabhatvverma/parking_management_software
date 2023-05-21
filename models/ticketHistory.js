import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const ticketHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    session_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    slotNo: {
        type: Number,
        required: true
    },
    vehicleOwnerName: {
        type: String,
        required: true
    },
    vehicleOwnerEmail: {
        type: String , match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        required: true
    },
    vehicleOwnerPhoneNo: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['car', 'jeep'],
        default: 'null'
    },
    vehicleNo: {
        type: String,
        required: true,
    },
    slotStatus:{
        type:String,
        enum:['parked', 'free'],
        default: 'parked'
    },
    VehicleEntered_At: {
        type: Date,
        required: true
    },
    vehicleReturned_At: {
        type: Date,
        required: false
    },
    totalRent: {
        type: String,
        required: true
    }
})

export default model('TicketHistory', ticketHistorySchema);