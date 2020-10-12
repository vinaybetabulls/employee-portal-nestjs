import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
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

  @Post('/create')
  @ApiOperation({ summary: 'Create Designations' })
  @ApiHeader({ name: 'token', description: 'authorization', required: true })
  @ApiBody({ type: DesignationDTO })
  async createDesignation(@Headers('token') authorization, @Body() request: DesignationDTO) {
    try {
      const token = await this.utilService.validateJSONToken(authorization);
      if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.CREATE, UserPermission.ADDITIONAL)) {
        throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
      }
      const user = {
        empUserName: token.user.username,
        empUniqueId: token.user.empUniqueId
      }
      return await this.designationService.createDesignation(request, user);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:desgUniqueId')
  @ApiOperation({ summary: 'Get individual Designation' })
  @ApiHeader({ name: 'token', description: 'authorization', required: true })
  @ApiParam({ name: 'desgUniqueId', required: true })
  async getDesignationById(@Headers('token') authorization, @Param('desgUniqueId') desgId) {
    try {
      await this.utilService.validateJSONToken(authorization);
      return await this.designationService.getDesignationByDesgId(desgId);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:desgUniqueId')
  @ApiOperation({ summary: 'Update Designation details' })
  @ApiHeader({ name: 'token', description: 'authorization', required: true })
  @ApiParam({ name: 'desgUniqueId' })
  async updateDesignationById(@Headers('token') authorization, @Param('desgUniqueId') desgId, @Body() DesignationDTO) {
    try {
      const token = await this.utilService.validateJSONToken(authorization);
      if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.EDIT, UserPermission.ADDITIONAL)) {
        throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
      }
      return await this.designationService.updateDesignationById(desgId, DesignationDTO);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:desgUniqueId')
  @ApiOperation({ summary: 'Delete Designation' })
  @ApiHeader({ name: 'token', description: 'authorization', required: true })
  @ApiParam({ name: 'desgUniqueId' })
  async deleteDesignationBtId(@Headers('token') authorization, @Param('desgUniqueId') desigUniqId) {
    try {
      const token = await this.utilService.validateJSONToken(authorization);
      if (token.user.username !== Admin.superAdminRole && !_.includes(token.user.permissions, UserPermission.DELETE, UserPermission.ADDITIONAL)) {
        throw new HttpException('Authorization', HttpStatus.FORBIDDEN)
      }
      return await this.designationService.deleteDesignationbyId(desigUniqId);
    } catch (error) {
      throw error;
    }
  }

}
