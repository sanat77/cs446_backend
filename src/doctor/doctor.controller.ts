import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { DoctorDTO } from './doctor.dto';
import { DoctorService } from './doctor.service';

export class DoctorController {
    private doctorService: DoctorService;

    constructor() {
        this.doctorService = new DoctorService();
    }

    public async CreateDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctorDTO = plainToClass(DoctorDTO, req.body);
            const errors = await validate(doctorDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const doctor = await this.doctorService.createDoctor(req.body);
            res.status(201).json(doctor);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetAllDoctors(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await this.doctorService.getDoctors();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetDoctorById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const doctor = await this.doctorService.getDoctorById(id);
            if (doctor) {
                res.status(200).json(doctor);
            } else {
                res.status(404).json({ message: 'Doctor not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetDoctorsWithFilters(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const doctorName: string = req.params.doctorName;
            const curLat: string = req.params.curLat;
            const curLong: string = req.params.curLong;
            const maxDistance: string = req.params.maxDistance;
            const speciality: string = req.params.speciality;
            const minRating: string = req.params.minRating;
            const insuranceProvider: string = req.params.insuranceProvider;
            const startDate: string = req.params.startDate;
            const endDate: string = req.params.endDate;
            const doctors = await this.doctorService.getDoctorsWithFilters(
                doctorName,
                curLat,
                curLong,
                maxDistance,
                speciality,
                minRating,
                insuranceProvider,
                startDate,
                endDate
            );
            if (doctors) {
                res.status(200).json(doctors);
            } else {
                res.status(404).json({ message: 'No doctor found!' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async UpdateDoctor(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const doctorDTO = plainToClass(DoctorDTO, req.body);
            const errors = await validate(doctorDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const doctor = await this.doctorService.updateDoctorById(
                id,
                req.body
            );
            if (doctor) {
                res.status(200).json(doctor);
            } else {
                res.status(404).json({ message: 'Doctor not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async DeleteDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctor = await this.doctorService.deleteDoctorById(
                req.params.id
            );
            if (doctor) {
                res.status(200).json(doctor);
            } else {
                res.status(404).json({ message: 'Doctor not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
