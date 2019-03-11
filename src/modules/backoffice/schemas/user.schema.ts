import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
});
