import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";


export class EmployeePermissionsDto {
    @ApiProperty({ name: 'permissions', type: Array, description: 'Employee permissions' })
    @IsString()
    permissions!: string[];

    @ApiProperty({ name: 'roles', type: Array, description: 'Employee roles' })
    @IsArray()
    roles!: string[];
}