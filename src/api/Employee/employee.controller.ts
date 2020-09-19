import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";
import * as _ from "lodash";
import * as Admin from '../../config/employee.default';
import { UtilService } from "../Utils/utils.service";
import { ChangePasswordDto } from "./dto/employee-change-pwd.dto";
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
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
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

    @Get("/:empId")
    @ApiParam({ name: 'empId', description: 'Employee Unique id' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    async getEmployeeById(@Headers('token') authorization, @Param('empId') empId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.employeeService.getEmployeeById(empId)

        } catch (error) {
            throw error;
        }
    }

    @Put('updatePassword/:empId')
    @ApiParam({ name: 'empId', description: 'Employee unique Id' })
    @ApiBody({ type: ChangePasswordDto, description: 'Employee passowrd request' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    async updateEmpPassword(@Headers('token') authorization, @Body() request, @Param('empId') empId) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.empUniqueId !== empId) {
                throw new HttpException('Access denied', HttpStatus.UNAUTHORIZED)
            }
            return await this.employeeService.updatePassword(request, token.user.empUniqueId);
        } catch (error) {
            throw error;
        }
    }
}