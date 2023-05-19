import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const adressSlotDetailScema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalSlots: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalAvailbleSlots: {
        type: String,
        required: true
    },
    activeAddress: {
        type: String,
        enum:["active", "inActive"],
        default:"inActive",
        required: true
    },
    total_income: {
        type: String,
        required: false
    }

},{ timestamps: false });

export default model('DailySession', adressSlotDetailScema);
