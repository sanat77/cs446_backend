import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsDefined,
    IsBoolean,
} from 'class-validator';

export class PatientDTO {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsDefined()
    phoneNumber!: number;

    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    isActive!: boolean;
}
