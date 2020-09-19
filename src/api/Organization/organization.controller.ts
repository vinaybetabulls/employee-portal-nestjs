import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import * as _ from "lodash";
import * as Admin from '../../config/employee.default';
import { UserPermission } from "../Employee/interfaces/employee.interface";
import { UtilService } from "../Utils/utils.service";
import { OrganizationRequestDto } from "./dto/organization.dto";
import { OrganizationService } from "./organization.service";



@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService, private utilService: UtilService) { }

    @Post('/create')
    @ApiOperation({ summary: 'Create Organization' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiBody({ type: OrganizationRequestDto })
    async createOrganization(@Headers('token') authorization, @Body() request: OrganizationRequestDto) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            const user = {
                empUserName: token.user.username,
                empUniqueId: token.user.empUniqueId
            }
            return await this.organizationService.createOrganization(request, user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/list')
    @ApiOperation({ summary: 'List of Organizations' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'pageNumber', required: false })
    @ApiParam({ name: 'pageLimit', required: false })
    async listOfOrganizations(@Headers('token') authorization, @Param('pageNumber') pageNumber: string, @Param('pageLimit') pageLimit: string) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username === Admin.superAdminRole || _.includes(token.user.permissions, UserPermission.ADDITIONAL)) {
                // get all list of organization
                return this.organizationService.listOfOrganizations(pageNumber, pageLimit);
            }
            else {
                // get organizations for particular employee
                return this.organizationService.getOrganizationByEmpId(token.user.empUniqueId);
            }
        } catch (error) {
            throw error;
        }
    }

    @Get('/:orgUniqueId')
    @ApiOperation({ summary: 'Get individual organization' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'orgUniqueId', required: true })
    async getOrganizationById(@Headers('token') authorization, @Param('orgUniqueId') orgId) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.organizationService.getOrganizationByOrgId(orgId);

        } catch (error) {
            throw error;
        }
    }

    @Delete('/:orgUniqueId')
    @ApiOperation({ summary: 'Delete organization' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'orgUniqueId', required: true })
    async deleteOrganizationById(@Headers('token') authorization, @Param('orgUniqueId') orgId) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.DELETE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            return await this.organizationService.deleteOrganizationByOrgId(orgId);
        } catch (error) {
            throw error;
        }
    }

    @Put('/:orgUniqueId')
    @ApiOperation({ summary: 'Update organization details' })
    @ApiHeader({ name: 'token', description: 'authorization', required: true })
    @ApiParam({ name: 'orgUniqueid' })
    async updateOrganizationById(@Headers('token') authorization, @Param('orgUniqueId') orgId) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.EDIT, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            return await this.organizationService.updateOrganizatonById(orgId);
        } catch (error) {
            throw error;
        }
    }
}
