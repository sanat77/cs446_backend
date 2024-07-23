import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { AppointmentDTO } from './appointment.dto';
import { AppointmentService } from './appointment.service';

export class AppointmentController {
    private appointmentService: AppointmentService;

    constructor() {
        this.appointmentService = new AppointmentService();
    }

    public async CreateAppointment(req: Request, res: Response): Promise<void> {
        try {
            const appointmentDTO = plainToClass(AppointmentDTO, req.body);
            const errors = await validate(appointmentDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const appointment = await this.appointmentService.createAppointment(
                req.body
            );
            if (!appointment) {
                res.status(400).send(
                    'Check parameters and try again, either appointment already exists or booking or patient does not exist!'
                );
                return;
            }
            res.status(201).json({
                Appointment: appointment,
                Message: 'Appointment created successfully!',
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async DeleteAppointment(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const appointment =
                await this.appointmentService.deleteAppointment(id);
            if (appointment) {
                res.status(200).send('Appointment deleted successfully!');
            } else {
                res.status(404).json({ message: 'Appointment not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAppointmentsByPatientId(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const patientId = req.params.patientId;
            const appointments =
                await this.appointmentService.getAppointmentsByPatientId(
                    patientId
                );
            if (appointments.length > 0) {
                res.status(200).json(appointments);
            } else {
                res.status(404).json({ message: 'No appointments found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAppointmentsByDoctorId(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const doctorId = req.params.doctorId;
            const appointments =
                await this.appointmentService.getAppointmentsByDoctorId(
                    doctorId
                );
            if (appointments.length > 0) {
                res.status(200).json(appointments);
            } else {
                res.status(404).json({ message: 'No appointments found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAppointmentById(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const id = req.params.id;
            const appointment =
                await this.appointmentService.getAppointmentById(id);
            if (appointment) {
                res.status(200).json(appointment);
            } else {
                res.status(404).json({ message: 'Appointment not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
