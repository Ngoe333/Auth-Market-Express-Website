
import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please provend your username'],
        unique: true,

    },

    email: {
        type: String,
        required: [true, 'Please provend your email'],
        unique: true,

    },

    password: {
        type: String,
        required: [true, 'Please provend your password'],
       
    },



}, {
    timestamps: true,
})



const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;