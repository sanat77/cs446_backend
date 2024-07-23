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

    public async GetDoctorsWithFilters(req: Request, res: Response): Promise<void> {
        try {
            const {
                doctorName,
                curLat,
                curLong,
                maxDistance,
                speciality,
                minRating,
                insuranceProvider,
                startDate,
                endDate
            } = req.query;
    
            // Type guard to ensure the values are strings
            const parsedDoctorName = typeof doctorName === 'string' ? doctorName : undefined;
            const parsedCurLat = typeof curLat === 'string' ? parseFloat(curLat) : undefined;
            const parsedCurLong = typeof curLong === 'string' ? parseFloat(curLong) : undefined;
            const parsedMaxDistance = typeof maxDistance === 'string' ? parseFloat(maxDistance) : undefined;
            const parsedSpeciality = typeof speciality === 'string' ? speciality : undefined;
            const parsedMinRating = typeof minRating === 'string' ? Number(minRating) : undefined;
            const parsedInsuranceProvider = typeof insuranceProvider === 'string' ? insuranceProvider : undefined;
            const parsedStartDate = typeof startDate === 'string' ? startDate : undefined;
            const parsedEndDate = typeof endDate === 'string' ? endDate : undefined;
    
            const doctors = await this.doctorService.getDoctorsWithFilters(
                parsedDoctorName,
                parsedCurLat,
                parsedCurLong,
                parsedMaxDistance,
                parsedSpeciality,
                parsedMinRating,
                parsedInsuranceProvider,
                parsedStartDate,
                parsedEndDate
            );
    
            if (doctors.length > 0) {
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
