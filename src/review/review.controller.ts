import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ReviewDTO } from './review.dto';
import { ReviewService } from './review.service';

export class ReviewController {
    private reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    public async CreateReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewDTO = plainToClass(ReviewDTO, req.body);
            const errors = await validate(reviewDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const review = await this.reviewService.createReview(req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetAllReviews(req: Request, res: Response): Promise<void> {
        try {
            const reviews = await this.reviewService.getReviews();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetReviewByPatientId(req: Request, res: Response): Promise<void> {
        try {
            const patientId = req.params.patientId;
            const reviews = await this.reviewService.getReviewsByPatientId(patientId);
            if (reviews) {
                res.status(200).json(reviews);
            } else {
                res.status(404).json({ message: 'No Reviews found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetReviewByDoctorId(req: Request, res: Response): Promise<void> {
        try {
            const doctorId = req.params.doctorId;
            const reviews = await this.reviewService.getReviewsByDoctorId(doctorId);
            if (reviews) {
                res.status(200).json(reviews);
            } else {
                res.status(404).json({ message: 'No Reviews found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async UpdateReview(req: Request, res: Response): Promise<void> {
        try {
            const _id = req.params.id;
            const reviewDTO = plainToClass(ReviewDTO, req.body);
            const errors = await validate(reviewDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const review = await this.reviewService.updateReviewById(
                _id,
                req.body
            );
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Review not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async DeleteReview(req: Request, res: Response): Promise<void> {
        try {
            const review = await this.reviewService.deleteReviewById(
                req.params.id
            );
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Review not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
