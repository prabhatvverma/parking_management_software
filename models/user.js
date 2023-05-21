import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String , match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        required: true
    },
    phoneNo:{
        type:String,
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