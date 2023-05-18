const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailySessionScema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    totalSlots: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    totalAvailbleSlots: {
        type: String,
        required: false
    },
    activeAddress: {
        type: String,
        required: false
    },
    total_income: {
        type: String,
        required: false
    }

},{ timestamps: false });

module.exports = mongoose.model('DailySession', dailySessionScema);
