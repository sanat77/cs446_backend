import { Schema, model } from 'mongoose';
import { IAppointment } from '../interfaces/IAppointment';

const appointmentSchema = new Schema<IAppointment>({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    bookingId: {
        type: String,
        ref: 'booking',
        required: true,
    },
    patientId: {
        type: String,
        ref: 'user',
        required: true,
    },
});

export const Appointment = model<IAppointment>(
    'appointment',
    appointmentSchema
);
