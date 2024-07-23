import { Document } from 'mongoose';

export interface IAppointment extends Document {
    _id: string;
    bookingId: string;
    patientId: string;
}
