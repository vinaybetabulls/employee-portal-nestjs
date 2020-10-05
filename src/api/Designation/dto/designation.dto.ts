
import { IsArray, IsNotEmptyObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class DesignationDTO {
    @IsString()
    @ApiProperty({ name: 'name', description: 'Designation', example: 'HR' })
    name!: string;
    @IsString()
    @ApiProperty({ name: 'level', description: 'Hirerachy' })
    level!: string;
    @IsString()
    @ApiProperty({ name: 'roleAndResponsibilities', description: 'Roles & Responsibilites' })
    roleAndResponsibilities!: string;
    @IsString()
    @ApiProperty({ name: 'notesURL', description: 'Roles Description' })
    notesURL!: string;
}