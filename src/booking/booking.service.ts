import { Booking } from './booking.schema';
import { IBooking, SlotStatus } from '../interfaces/IBooking';

export class BookingService {
    public async createBooking(data: IBooking): Promise<IBooking | null> {
        const booking: IBooking | null = await Booking.findOne({
            doctorId: data.doctorId,
            startTime: data.startTime,
        });
        if (booking) {
            return null;
        }
        const { _id, doctorId, startTime, duration, status } = data;
        const newBooking = new Booking({
            _id,
            doctorId,
            startTime,
            duration,
            status,
        });
        return await newBooking.save();
    }

    public async deleteBooking(id: string): Promise<IBooking | null> {
        return await Booking.findByIdAndDelete(id);
    }

    public async setBookingAsBooked(id: string): Promise<IBooking | null> {
        return await Booking.findByIdAndUpdate(
            id,
            { status: SlotStatus.BOOKED },
            { new: true }
        );
    }
    public async getBookingsByDoctorId(doctorId: string): Promise<IBooking[]> {
        return await Booking.find({ doctorId: doctorId });
    }

    public async getBookingById(id: string): Promise<IBooking | null> {
        return await Booking.findById(id);
    }
}
