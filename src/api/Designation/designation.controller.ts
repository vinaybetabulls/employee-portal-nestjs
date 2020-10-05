import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";
import { UtilService } from "../Utils/utils.service";
import { DesignationService } from "./designation.service";
import * as _ from "lodash";
import * as Admin from '../../config/employee.default';
import { UserPermission } from "../Employee/interfaces/employee.interface";
import { DesignationDTO } from './dto/designation.dto';

@ApiTags('Designation')
@Controller('designation')

export class DesignationController {
  constructor(private designationService: DesignationService, private utilService: UtilService) { }

  @Get('list')
  @ApiOperation({ summary: 'Get All Designations' })
  @ApiHeader({ name: 'token', description: 'authorization', required: true })
  @ApiParam({ name: 'pageNumber', required: false })
  @ApiParam({ name: 'pageLimit', required: false })
  async getDesignationsList(@Headers('token') authorization, @Param('pageNumber') pageNumber: string, @Param('pageLimit') pageLimit: string) {
    try {
      const token = await this.utilService.validateJSONToken(authorization);
      if (token.user.username === Admin.superAdminRole || _.includes(token.user.permissions, UserPermission.ADDITIONAL)) {
          // get all list of organization
          return this.designationService.listOfDesignations(pageNumber, pageLimit);
      }
  } catch (error) {
      throw error;
  }
  }
}
