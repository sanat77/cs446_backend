import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { PatientDTO } from './patient.dto';
import { PatientService } from './patient.service';

export class PatientController {
    private patientService: PatientService;

    constructor() {
        this.patientService = new PatientService();
    }

    public async CreatePatient(req: Request, res: Response): Promise<void> {
        try {
            const patientDTO = plainToClass(PatientDTO, req.body);
            const errors = await validate(patientDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const patient = await this.patientService.createPatient(req.body);
            res.status(201).json(patient);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetAllPatients(req: Request, res: Response): Promise<void> {
        try {
            const patients = await this.patientService.getPatients();
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetPatientById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const patient = await this.patientService.getPatientById(id);
            if (patient) {
                res.status(200).json(patient);
            } else {
                res.status(404).json({ message: 'Patient not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async UpdatePatient(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const patientDTO = plainToClass(PatientDTO, req.body);
            const errors = await validate(patientDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const patient = await this.patientService.updatePatientById(
                id,
                req.body
            );
            if (patient) {
                res.status(200).json(patient);
            } else {
                res.status(404).json({ message: 'Patient not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async DeletePatient(req: Request, res: Response): Promise<void> {
        try {
            const patient = await this.patientService.deletePatientById(
                req.params.id
            );
            if (patient) {
                res.status(200).json(patient);
            } else {
                res.status(404).json({ message: 'Patient not found!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
