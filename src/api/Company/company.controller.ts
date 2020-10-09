import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import * as _ from "lodash";
import * as Admin from '../../config/employee.default';
import { UserPermission } from "../Employee/interfaces/employee.interface";
import { UtilService } from "../Utils/utils.service";
import { CompanyService } from "./company.service";
import { CompanyRequestDto } from "./dto/company.request.dto";


@ApiTags('Company')
@Controller('company')

export class CompanyController {
    constructor(private utilService: UtilService, private companyService: CompanyService) { }

    @Post('/create')
    @ApiOperation({ summary: 'Create Company' })
    @ApiHeader({ name: 'token', description: 'authentication', required: true })
    @ApiBody({ type: CompanyRequestDto })
    async createCompany(@Headers('token') authorization, @Body() request: CompanyRequestDto) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            const user = {
                empUserName: token.user.username,
                empUniqueId: token.user.empUniqueId
            }
            return await this.companyService.createCompany(request, user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/list')
    @ApiOperation({ summary: 'Get all companies list' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'pageNumber', required: false })
    @ApiParam({ name: 'pageLimit', required: false })
    async listOfCompanies(@Headers('token') authorization, @Param('pageNumber') pageNumber: string, @Param('pageLimit') pageLimit: string) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username === Admin.superAdminRole || _.includes(token.user.permissions, UserPermission.ADDITIONAL)) {
                // get all list of organization
                return this.companyService.getCompaniesList(pageNumber, pageLimit);
            }
            else {
                const empId = token.user.empUniqueId;
                return await this.companyService.getCompanyByEmpId(empId);
            }
        } catch (error) {

        }
    }

    @Get('/:companyUniqId')
    @ApiOperation({ summary: 'Get company by Id' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'companyUniqId', required: true })
    async getCompanyById(@Headers('token') authorization, @Param('companyUniqId') companyId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.companyService.getCompanyById(companyId);

        } catch (error) {
            throw error;
        }
    }

    @Delete('/:companyUniqId')
    @ApiOperation({ summary: ' Delet company by Id' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'companyUniqId', required: true })
    async deleteCompanyById(@Headers('token') authorization, @Param('companyUniqId') companyId) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.DELETE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            return await this.companyService.deleteCompanyById(companyId);
        } catch (error) {
            throw error;
        }
    }

    @Get('getCompanyByOrg/:orgUniqId')
    @ApiOperation({ summary: 'Get companies based on organization' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'orgUniqId', required: true })
    async getComapniesByOrgId(@Headers('token') authorization, @Param('orgUniqId') orgUniqId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.companyService.getCompaniesByOrgId(orgUniqId);
        } catch (error) {
            throw error;
        }
    }
}