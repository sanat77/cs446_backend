import { Document } from 'mongoose';

export interface IPatient extends Document {
    _id: String;
    name: string;
    phoneNumber: number;
    isActive: Boolean;
}
