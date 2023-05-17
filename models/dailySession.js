const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailySessionScema = new Schema({
    userId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalSlots: {
        type: String,
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
        required: true
    },
    total_income: {
        type: String,
        required: true
    }

},{ timestamps: true });

module.exports = mongoose.model('DailySession', dailySessionScema);
