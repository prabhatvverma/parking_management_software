import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

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

export default model('User',userSchema);