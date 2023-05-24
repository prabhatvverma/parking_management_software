import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const parkingDetailScema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    totalSlots: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: false });

export default model('ParkingDetail', parkingDetailScema);
