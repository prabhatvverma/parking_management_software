import { Schema as _Schema, model } from 'mongoose';
import { hash } from 'bcrypt';
import validator from 'validator';
const Schema = _Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: [20, "Name can not have more than 20 charecters"],
        minlength: [4, "Name must have atleast 4 charecters"]
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phoneNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "Atleast required 4 charecters"],
    },
    emailVerifiedAt: {
        type: Date,
        required: false
    }

}, { timestamps: true });

// userSchema.pre("save", async function(next) {
//     // Do not run if password not changed
//     if (!this.isModified("password")) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// })


export default model('User', userSchema);