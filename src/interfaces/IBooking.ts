import { Document } from 'mongoose';

export enum SlotStatus {
    AVAILABLE = 'AVAILABLE',
    BOOKED = 'BOOKED',
}

export interface IBooking extends Document {
    _id: string;
    doctorId: string;
    startTime: Date;
    duration: number;
    status: SlotStatus;
}
