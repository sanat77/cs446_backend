import { Document } from 'mongoose';

export interface IReview extends Document {
    _id: string;
    patientId: string;
    doctorId: string;
    reviewerName: string;
    isAnonymous: boolean;
    rating: number;
    reviewText: string;
    date: Date;
}
