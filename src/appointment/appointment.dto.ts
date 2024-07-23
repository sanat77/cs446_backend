import { IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDTO {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    bookingId!: string;

    @IsString()
    @IsNotEmpty()
    patientId!: string;
}
