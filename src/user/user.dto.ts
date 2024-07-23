import { IsString, IsNotEmpty } from 'class-validator';

import { UserRole } from '../interfaces/IUser';

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    role!: UserRole;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
