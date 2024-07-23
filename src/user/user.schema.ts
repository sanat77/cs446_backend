import { Schema, model } from 'mongoose';
import { IUser, UserRole } from '../interfaces/IUser';

const userSchema = new Schema<IUser>({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: UserRole,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = model<IUser>('user', userSchema);
