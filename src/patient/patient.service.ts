import { Patient } from './patient.schema';
import { IPatient } from '../interfaces/IPatient';

export class PatientService {
    public async createPatient(data: IPatient): Promise<IPatient> {
        const patient = new Patient(data);
        return await patient.save();
    }

    public async getPatients(): Promise<IPatient[]> {
        return await Patient.find();
    }

    public async getPatientById(id: String): Promise<IPatient | null> {
        return await Patient.findOne({ _id: id });
    }

    public async updatePatientById(
        id: String,
        data: Partial<IPatient>
    ): Promise<IPatient | null> {
        return await Patient.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    public async deletePatientById(id: String): Promise<IPatient | null> {
        return await Patient.findOneAndDelete({ _id: id });
    }
}
