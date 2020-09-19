import { Body, Controller, Headers, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
import * as _ from "lodash";
import * as Admin from '../../config/employee.default';
import { UtilService } from "../Utils/utils.service";
import { EmployeeCreateDto, EmployeeLoginDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";
import { UserPermission } from "./interfaces/employee.interface";

@ApiTags('Employee')
@Controller('employee')

export class EmployeeController {

    constructor(private employeeService: EmployeeService, private utilService: UtilService) { }
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
    async createEmployee(@Headers('token') authorization, @Body() request) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            const user = {
                empUserName: token.user.username,
                empUniqueId: token.user.empUniqueId
            }
            return await this.employeeService.createEmployee(request, user);

        } catch (error) {
            throw error;
        }

    }
}