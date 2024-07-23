import { Schema, model } from 'mongoose';
import { IPatient } from '../interfaces/IPatient';

const patientSchema = new Schema<IPatient>({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    }
});

export const Patient = model<IPatient>('patient', patientSchema);
