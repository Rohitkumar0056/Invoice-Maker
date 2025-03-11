import mongoose from "mongoose";

const clientSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    userId: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {timestamps: true});

const Client = mongoose.model('Client', clientSchema);

export default Client;