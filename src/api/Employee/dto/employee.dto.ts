
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
    @IsString()
    @ApiProperty({ name: 'username', description: 'employee username or email' })
    username!: string;

    @IsString()
    @ApiProperty({ name: 'password', description: 'employee password' })
    password!: string;
}