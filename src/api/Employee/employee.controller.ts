import { Controller, Post, Req } from "@nestjs/common";
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
import { EmployeeDto } from "./dto/employee.dto";

@ApiTags('Employee')
@Controller('employee')

export class EmployeeController {

    @ApiProperty({ description: 'Employee login' })
    @Post()
    @ApiBody({ type: EmployeeDto, description: 'employee username/email and password'})

    async employeeLogin(@Req() request) {
        try {
            return request;
        } catch (error) {
            return error;
        }
    }
}