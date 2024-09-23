import { Verify } from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true, 
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
    },
    isVarified:{
        type: Boolean,
        default: false
    },
    isAadmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    VerifyToken: String,
    VerifyTokenExpiry: Date
})

const User = mongoose.model.users || mongoose.model('users', userSchema);
export default User;