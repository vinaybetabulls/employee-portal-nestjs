
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmptyObject, IsNumber, IsString } from 'class-validator';

export class EmployeeLoginDto {
    @IsString()
    @ApiProperty({ name: 'username', description: 'employee username or email' })
    username!: string;

    @IsString()
    @ApiProperty({ name: 'password', description: 'employee password' })
    password!: string;
}

// enum EmpJobType {
//     'Full Time',
//     'Part Time'
// }

export class EmploayeeAddress {
    @IsString()
    @ApiProperty({ name: 'address', description: 'address', example: '#123, Building 20, Mindspace' })
    address!: string;
    @IsString()
    @ApiProperty({ name: 'city', description: 'City' })
    city!: string;
    @IsString()
    @ApiProperty({ name: 'state', description: 'State' })
    state!: string;
    @IsString()
    @ApiProperty({ name: 'country', description: 'Country' })
    country!: string;
    @IsString()
    @ApiProperty({ name: 'zipcode', description: 'Zipcode' })
    zipcode!: string;
}


export class EmpWorkExp {
    @ApiProperty({ name: 'years', description: 'Employee exp in years' })
    @IsNumber()
    years: number;
    @ApiProperty({ name: 'months', description: 'Employee exp in months' })
    @IsNumber()
    months: number;
}

export class EmpOrganization {
    @ApiProperty({ name: 'id', description: 'Organization uniqueId' })
    @IsString()
    id: string;
    @ApiProperty({ name: 'name', description: 'Organization name' })
    @IsString()
    name: string;
}
export class EmpCompany {
    @ApiProperty({ name: 'id', description: 'Company uniqueId' })
    @IsString()
    id: string;
    @ApiProperty({ name: 'name', description: 'Company name' })
    @IsString()
    name: string;
}
export class EmpDesignation {
    @ApiProperty({ name: 'id', description: 'Designation uniqueId' })
    @IsString()
    id: string;
    @ApiProperty({ name: 'name', description: 'Designation name' })
    @IsString()
    name: string
}
export class EmpDepartment {
    @ApiProperty({ name: 'id', description: 'Department uniqueId' })
    @IsString()
    id: string;
    @ApiProperty({ name: 'name', description: 'Department uniqueId' })
    @IsString()
    name: string
}

export enum PermissionsEnum {
    VIEW = 'VIEW',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    CREATE = 'CREATE',
}

export class EmployeeCreateDto {
    @ApiProperty({ name: 'firstName', description: 'Employee first name' })
    @IsString()
    firstName!: string;

    @ApiProperty({ name: 'lastName', description: 'Employee last name' })
    @IsString()
    lastName!: string;

    @ApiProperty({ name: 'middleName', description: 'Employee middle name' })
    @IsString()
    middleName!: string;

    @ApiProperty({ name: 'userName', description: 'Employee user name' })
    @IsString()
    userName!: string;

    @ApiProperty({ name: 'email', description: 'Employee email' })
    @IsString()
    email!: string;

    @ApiProperty({ name: 'phone', description: 'Employee phone number' })
    @IsString()
    phone!: string;

    // @ApiProperty({ name: 'role', description: 'Employee role', type: Array })
    // @IsArray()
    // roles!: string;

    // @ApiProperty({ name: 'permissions', description: 'Employee permissions', enum: Object.keys(PermissionsEnum) })
    // @IsArray()
    // permissions!: PermissionsEnum;

    @ApiProperty({ name: 'isActive', description: 'Employee active status' })
    @IsBoolean()
    isActive!: boolean;

    @ApiProperty({ name: 'jobType', description: 'Employee Job Type' })
    @IsString()
    jobType!: string;

    @ApiProperty({ name: 'workType', description: 'Employee work type' })
    @IsString()
    wrokType!: string;

    @ApiProperty({ name: 'bloodGroup', description: 'Employee blood group' })
    @IsString()
    bloodGroup: string;

    @ApiProperty({ name: 'workExperience', description: 'Employee work experience', type: EmpWorkExp })
    @IsNotEmptyObject()
    workExperience!: EmpWorkExp;

    @ApiProperty({ name: 'dob', description: 'Employee Dateofbirth', type: Date })
    @IsString()
    dob: string;

    @ApiProperty({ name: 'fathersName', description: 'Employee fathers name' })
    @IsString()
    fathersName!: string;

    @ApiProperty({ name: 'gender', description: 'Employee gender' })
    @IsString()
    gender: string;

    @ApiProperty({ name: 'motherTounge', description: 'Employee mother tounge' })
    @IsString()
    motherTounge: string;

    @ApiProperty({ name: 'nationality', description: 'Employee Nationality' })
    @IsString()
    nationality!: string;

    @ApiProperty({ name: 'maritalStatus', description: 'Employee maritalStatus' })
    @IsString()
    maritalStatus: string;

    @ApiProperty({ name: 'aadharCardNumber', description: 'Employee aadharCardNumber' })
    @IsString()
    aadharCardNumber: string;

    @ApiProperty({ name: 'panCardNumber', description: 'Employee panCardNumber' })
    @IsString()
    panCardNumber: string;

    @ApiProperty({ name: 'profileImageURL', description: 'Employee prfileImageURL' })
    @IsString()
    profileImageURL: string;

    @ApiProperty({ name: 'dateOfJoining', description: 'Employee dateOfJoining', type: Date })
    @IsString()
    dateOfJoining: string;


    @ApiProperty({ name: 'organization', description: 'Employee organization', type: EmpOrganization })
    @IsNotEmptyObject()
    organization: EmpOrganization;

    @ApiProperty({ name: 'company', description: 'Employee company', type: EmpCompany })
    @IsNotEmptyObject()
    company: EmpCompany;
    @ApiProperty({ name: 'designation', description: 'Employee designation', type: EmpDesignation })
    @IsNotEmptyObject()
    designation: EmpDesignation;
    @ApiProperty({ name: 'department', description: 'Employee department', type: EmpDepartment })
    @IsNotEmptyObject()
    department: EmpDepartment;

    @ApiProperty({ name: 'empId', description: 'Employee Id' })
    @IsString()
    empId!: string

    @IsArray()
    @ApiProperty({ name: 'employeeAddress', description: 'Company Address', type: EmploayeeAddress })
    employeeAddress!: EmploayeeAddress

}