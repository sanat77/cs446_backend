import { Document } from 'mongoose';

export enum UserRole {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
}

export interface IUser extends Document {
    _id: string;
    role: UserRole;
    username: string;
    password: string;
}
