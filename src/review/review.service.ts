import { Review } from './review.schema';
import { IReview } from '../interfaces/IReview';

export class ReviewService {
    public async createReview(data: IReview): Promise<IReview> {
        const review = new Review(data);
        return await review.save();
    }

    public async getReviews(): Promise<IReview[]> {
        return await Review.find();
    }

    public async getReviewsByPatientId(patientId: String): Promise<IReview[] | null> {
        return await Review.find({ patientId: patientId });
    }

    public async getReviewsByDoctorId(doctorId: String): Promise<IReview[] | null> {
        return await Review.find({ doctorId: doctorId });
    }

    public async updateReviewById(
        _id: String,
        data: Partial<IReview>
    ): Promise<IReview | null> {
        return await Review.findOneAndUpdate({ _id: _id }, data, { new: true });
    }

    public async deleteReviewById(_id: string): Promise<IReview | null> {
        return await Review.findOneAndDelete({ _id: _id });
    }
}
