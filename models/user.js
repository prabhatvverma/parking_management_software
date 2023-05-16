const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo:{
        type:BigInt,
        required:true
    },
    address:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerifiedAt:{
        type:Date,
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('User',userSchema);