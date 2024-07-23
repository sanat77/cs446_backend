import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsDefined,
    IsBoolean,
    IsDate,
} from 'class-validator';

export class ReviewDTO {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsNotEmpty()
    @IsString()
    patientId!: string;

    @IsString()
    @IsNotEmpty()
    doctorId!: string;

    @IsString()
    @IsNotEmpty()
    reviewerName!: string;

    @IsBoolean()
    @IsDefined()
    isAnonymous!: boolean;

    @IsString()
    @IsNotEmpty()
    reviewText!: string;

    @IsNumber()
    @IsDefined()
    rating!: number;

    @IsDefined()
    date!: Date;
}
