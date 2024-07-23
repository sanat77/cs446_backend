import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces/IReview';

const reviewSchema = new Schema<IReview>({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    reviewerName: {
        type: String,
        required: true,
    },
    isAnonymous: {
        type: Boolean,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

export const Review = model<IReview>('review', reviewSchema);
