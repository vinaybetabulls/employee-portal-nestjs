import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty({ name: 'oldPassword', description: "Emp old password", required: true })
    @IsString()
    oldPassword!: string;

    @ApiProperty({ name: 'newPassword', description: 'Emp new password', required: true })
    @IsString()
    newPassword!: string

    @ApiProperty({ name: 'confirmPassword', description: 'Emp confirm new password', required: true })
    confirmPassword!: string;
}