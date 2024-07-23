import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsLatitude,
    IsLongitude,
    IsPositive,
    Min,
    Max,
    IsDefined,
    isString,
    IsArray,
} from 'class-validator';

export class DoctorDTO {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsOptional()
    @IsString()
    profileImage?: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    practiceName!: string;

    @IsNumber()
    @IsDefined()
    phoneNumber!: number;

    @IsString()
    @IsNotEmpty()
    specialty!: string;

    @IsNumber()
    @IsLatitude()
    @IsDefined()
    latitude!: number;

    @IsNumber()
    @IsLongitude()
    @IsDefined()
    longitude!: number;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsDefined()
    rating!: number;

    @IsArray()
    @IsDefined()
    insuranceProviders!: [string];
}
