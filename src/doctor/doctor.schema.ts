import { Schema, model } from 'mongoose';
import { IDoctor } from '../interfaces/IDoctor';

const doctorSchema = new Schema<IDoctor>({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    practiceName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    insuranceProviders: {
        type: [String],
        required: true,
    },
});

export const Doctor = model<IDoctor>('doctor', doctorSchema);
