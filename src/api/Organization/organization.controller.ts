import { Body, Controller, Headers, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import * as _ from "lodash";

import { OrganizationRequestDto } from "./dto/organization.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { OrganizationService } from "./organization.service";
import { UtilService } from "../Utils/utils.service";
import * as Admin from '../../config/employee.default'
import { UserPermission } from "../Employee/interfaces/employee.interface";

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService, private utilService: UtilService){}

    @Post('/create')
    @ApiOperation({ summary: 'Create Organization' })   
    @ApiHeader({name:'token', description: 'authorization'})
    @ApiBody({ type: OrganizationRequestDto })
    async createOrganization(@Headers('token') authorization, @Body() request: OrganizationRequestDto) {
        try {
            const token = await this.utilService.validateJSONToken(authorization);
            if(token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
                throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
            }
            return await this.organizationService.createOrganization(request);
        } catch (error) {
            return error;
        }
    }
}
