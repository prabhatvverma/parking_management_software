import { Schema as _Schema, model } from 'mongoose';
import { hash } from 'bcrypt';
const Schema = _Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i,
        required: true,
        unique: true
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
        required: true
    },
    emailVerifiedAt: {
        type: Date,
        required: false
    }

}, { timestamps: true });

// userSchema.pre('save', async function (next) {
//     try {
//         if (!this.isModified('password')) {
//             return next();
//         }
//         const hashedPassword = await hash(this.password, 10);
//         this.password = hashedPassword
//         next();
//     } catch (error) {
//         console.log(error);
//         return next(error);
//     }
// })

export default model('User', userSchema);