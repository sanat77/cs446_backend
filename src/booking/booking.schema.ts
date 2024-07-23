import { Schema, model } from 'mongoose';
import { IBooking } from '../interfaces/IBooking';

const bookingSchema = new Schema<IBooking>({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    doctorId: {
        type: String,
        ref: 'doctor',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['AVAILABLE', 'BOOKED'],
    },
});

export const Booking = model<IBooking>('booking', bookingSchema);
