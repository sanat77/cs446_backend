import { Appointment } from './appointment.schema';
import { IAppointment } from '../interfaces/IAppointment';
import { Booking } from '../booking/booking.schema';
import { User } from '../user/user.schema';

export class AppointmentService {
    public async createAppointment(
        data: IAppointment
    ): Promise<IAppointment | null> {
        const appointment: IAppointment | null = await Appointment.findOne({
            bookingId: data.bookingId,
            patientId: data.patientId,
        });
        if (appointment) {
            return null;
        }
        const booking = await Booking.findById(data.bookingId);
        if (!booking) {
            return null;
        }

        const patient = await User.findById(data.patientId);
        if (!patient) {
            return null;
        }

        const { _id, bookingId, patientId } = data;
        const newAppointment = new Appointment({
            _id,
            bookingId,
            patientId,
        });
        return await newAppointment.save();
    }

    public async deleteAppointment(id: string): Promise<IAppointment | null> {
        return await Appointment.findByIdAndDelete(id);
    }

    public async getAppointmentsByPatientId(
        patientId: string
    ): Promise<IAppointment[]> {
        return await Appointment.find({ patientId: patientId })
            .populate({
                path: 'bookingId',
                select: 'startTime duration status',
                populate: {
                    path: 'doctorId',
                    select: 'name specialty latitude longitude address',
                },
            })
            .exec();
    }

    public async getAppointmentsByDoctorId(
        doctorId: string
    ): Promise<IAppointment[]> {
        const bookings = await Booking.find({ doctorId: doctorId });
        const bookingIds = bookings.map((booking) => booking._id);
        return await Appointment.find({ bookingId: { $in: bookingIds } })
            .populate({
                path: 'bookingId',
                select: 'startTime duration status',
                populate: {
                    path: 'doctorId',
                    select: 'name specialty latitude longitude address',
                },
            })
            .exec();
    }

    public async getAppointmentById(id: string): Promise<IAppointment | null> {
        return await Appointment.findById(id)
            .populate({
                path: 'bookingId',
                select: 'startTime duration status',
                populate: {
                    path: 'doctorId',
                    select: 'name specialty latitude longitude address',
                },
            })
            .exec();
    }
}
