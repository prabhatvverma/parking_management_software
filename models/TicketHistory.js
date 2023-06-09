import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const ticketHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    slotId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    slotNo: {
        type: Number,
        required: true
    },
   ownerName: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String , match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        required: true
    },
    ownerPhoneNo: {
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
    vehicleEntered_At: {
        type: Date,
        required: false
    },
    vehicleReturned_At: {
        type: Date,
        required: false
    },
    vehicleTicket:{
        type: String,
        required: true 
    },
    totalRent: {
        type: Number,
        required: true
    }
})

export default model('TicketHistory', ticketHistorySchema);