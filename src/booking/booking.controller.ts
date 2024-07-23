import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { BookingDTO } from './booking.dto';
import { BookingService } from './booking.service';

export class BookingController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    public async CreateBooking(req: Request, res: Response): Promise<void> {
        try {
            const bookingDTO = plainToClass(BookingDTO, req.body);
            const errors = await validate(bookingDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const booking = await this.bookingService.createBooking(req.body);
            if (!booking) {
                res.status(400).send('Booking already exists!');
                return;
            }
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async DeleteBooking(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const booking = await this.bookingService.deleteBooking(id);
            if (booking) {
                res.status(200).send('Booking deleted successfully!');
            } else {
                res.status(404).json({ message: 'Booking not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async SetBookingAsBooked(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const id = req.params.id;
            const booking = await this.bookingService.setBookingAsBooked(id);
            if (booking) {
                res.status(200).json({
                    message: 'Booking set as booked!',
                    updatedBooking: booking,
                });
            } else {
                res.status(404).json({ message: 'Booking not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getBookingsByDoctorId(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const doctorId = req.params.doctorId;
            const bookings =
                await this.bookingService.getBookingsByDoctorId(doctorId);
            if (bookings) {
                res.status(200).json(bookings);
            } else {
                res.status(404).json({ message: 'No bookings found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getBookingById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const booking = await this.bookingService.getBookingById(id);
            if (booking) {
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: 'Booking not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
