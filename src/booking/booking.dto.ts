import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
    IsDefined,
} from 'class-validator';

import { SlotStatus } from '../interfaces/IBooking';

export class BookingDTO {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    doctorId!: string;

    @IsDefined()
    startTime!: Date;

    @IsNumber()
    @IsPositive()
    @IsDefined()
    duration!: number;

    @IsString()
    @IsNotEmpty()
    status!: SlotStatus;
}
