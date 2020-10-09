import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";


export class DepartmentRequstDto {
    @IsString()
    @ApiProperty({ name: 'departmentName', description: 'Department Name' })
    departmentName!: string;

    @IsString()
    @ApiProperty({ name: 'departmentCategory', description: 'Department Category' })
    departmentCategory!: string;

    @IsArray()
    @ApiProperty({ name: 'companiesList', description: 'Companies List' })
    companiesList!: string[]
}

