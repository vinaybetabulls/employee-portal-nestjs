import { Controller, Post, Headers, Body, HttpStatus, HttpException, Get, Param, Delete, Put, Query } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UtilService } from "../Utils/utils.service";
import { DepartmentRequstDto } from "./dto/department-request.dto";
import * as _ from "lodash";
import * as Admin from '../../config/employee.default';
import { UserPermission } from "../Employee/interfaces/employee.interface";
import { DepartmentService } from "./department.service";

@ApiTags('Department')
@Controller()
export class DepartmentController {

    constructor(private utilService: UtilService, private departmentService: DepartmentService) { }

    @Post('department/create')
    @ApiOperation({ summary: 'Create Department' })
    @ApiHeader({ name: 'token', description: 'authentication', required: true })
    @ApiBody({ type: DepartmentRequstDto })
    async createDepartment(@Headers('token') authorization, @Body() request: DepartmentRequstDto) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            const user = {
                empUserName: token.user.username,
                empUniqueId: token.user.empUniqueId
            }
            return this.departmentService.createDepartment(request, user);
        } catch (error) {
            throw error;
        }
    }

    @Get('department/list')
    @ApiOperation({ summary: 'Get Departments List' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiQuery({ name: 'pageNumber', required: false })
    @ApiQuery({ name: 'pageLimit', required: false })
    async listOfCompanies(@Headers('token') authorization, @Query('pageNumber') pageNumber: string, @Query('pageLimit') pageLimit: string) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username === Admin.superAdminRole || !_.includes(token.user.permissions, UserPermission.ADDITIONAL)) {
                return await this.departmentService.getDepartmentList(pageNumber, pageLimit);
            }
            else {
                const empId = token.user.empUniqueId;
                return await this.departmentService.getDepartmentByEmpId(empId);
            }
        } catch (error) {

        }
    }

    @Get('/getDepartment/:deartmentUniqId')
    @ApiOperation({ summary: 'Get departmentBy departmentId' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'deartmentUniqId', description: 'Department Unique Id' })
    async getDepartmentById(@Headers('token') authorization: string, @Param('deartmentUniqId') deptUniqid: string) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.departmentService.getDepartmentById(deptUniqid);
        } catch (error) {
            throw error;
        }
    }

    @Get('/getDepartmentByEmpId/:empUniqId')
    @ApiOperation({ summary: 'Get departmentBy departmentId' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'empUniqId', description: 'Employee Unique Id', type: String })
    async getDepartmentByEmpId(@Headers('token') authorization, @Param('empUniqId') empUniqId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.departmentService.getDepartmentByEmpId(empUniqId);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/deleteDepartmentById/:departmentUniqId')
    @ApiOperation({ summary: 'Delete Department by Department Id' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'departmentUniqId', description: 'Employee Unique Id', type: String })
    async deleteDepartmentById(@Headers('token') authorization, @Param('departmentUniqId') deptUniqId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.departmentService.deleteDepartmentById(deptUniqId);
        } catch (error) {
            throw error;
        }
    }

    @Get('department/getDepartmentByCompanyId/:companyUniqId')
    @ApiOperation({ summary: 'Get Department by Company Id' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'companyUniqId', description: 'Employee Unique Id', type: String })
    async getDepartmentsByCompanyId(@Headers('token') authorization, @Param('companyUniqId') companyUnqId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.departmentService.getDepartmentByCompanyId(companyUnqId);
        } catch (error) {
            throw error;
        }
    }
    @Put('department/:departmentId')
    @ApiOperation({ summary: 'Update department by departmentId' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'departmentId', description: 'Department unique id', type: String })
    @ApiBody({ type: DepartmentRequstDto })
    async updateDepartmentById(@Headers('token') authorization, @Param('departmentId') deptUniqid: string, @Body() request: DepartmentRequstDto) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            return await this.departmentService.updateDepartmentById(deptUniqid, request);
        } catch (error) {
            throw error;
        }
    }
}