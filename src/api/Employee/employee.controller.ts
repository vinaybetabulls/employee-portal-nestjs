import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
import { EmployeeCreateDto, EmployeeLoginDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";

@ApiTags('Employee')
@Controller('employee')

export class EmployeeController {

    constructor(private employeeService: EmployeeService) { }
    @ApiProperty({ description: 'Employee login' })
    @Post('/login')
    @ApiBody({ type: EmployeeLoginDto, description: 'employee userName/email and password' })

    async employeeLogin(@Body() request) {
        try {
            return await this.employeeService.employeeLogin(request);
        } catch (error) {
            throw error;
        }
    }

    @ApiProperty({ description: 'Create Employee' })
    @Post('/create')
    @ApiBody({ type: EmployeeCreateDto, description: 'Employee creation' })
    async createEmployee() {
        try {
            return 'emp'
        } catch (error) {
            throw error;
        }

    }
}