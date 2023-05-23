import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const ticketSchema = new Schema({
    slotId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    slotNo: {
        type: Number,
        required: false
    },
    vehicleOwnerName: {
        type: String,
        required: true
    },
    vehicleOwnerEmail: {
        type: String, match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        required: true
    },
    vehicleOwnerPhoneNo: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['car', 'jeep'],
        default: ""
    },
    vehicleNo: {
        type: String,
        required: true,
    },
    vehicleEntered_At: {
        type: Date,
        required: true
    },
    vehicleReturned_At: {
        type: Date,
        required: false,
        default: null
    },
    vehicleTicket:{
        type: String,
        required: true
    }
})

export default model('Ticket', ticketSchema);