import { Document } from 'mongoose';

export interface IDoctor extends Document {
    _id: String;
    profileImage: string;
    name: string;
    practiceName: string;
    phoneNumber: number;
    specialty: string;
    latitude: number;
    longitude: number;
    address: string;
    rating: number;
    insuranceProviders: [string];
}
