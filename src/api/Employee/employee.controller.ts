import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
import { EmployeeDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";

@ApiTags('Employee')
@Controller('employee')

export class EmployeeController {

    constructor(private employeeService: EmployeeService) { }
    @ApiProperty({ description: 'Employee login' })
    @Post('/login')
    @ApiBody({ type: EmployeeDto, description: 'employee userName/email and password' })

    async employeeLogin(@Body() request) {
        try {
            return await this.employeeService.employeeLogin(request);
        } catch (error) {
            return error;
        }
    }
}