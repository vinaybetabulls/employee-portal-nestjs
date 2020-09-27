import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { OrganizationRequestDto } from "./dto/organization.dto";
import { OrganizationCommonService } from "./organization.common.service";
import * as fs from 'fs';


@Injectable()

export class OrganizationService {

    constructor(private commonService: OrganizationCommonService) { }
    /**
     * 
     * @param request 
     * @param file 
     */
    async createOrganization(request: OrganizationRequestDto, user: any): Promise<any> {
        try {
            const orgUniqueId = uuid();
            // check organization already exists
            const isOrgExists = await this.commonService.isOrganizationExists(request.organizationCode);
            if (isOrgExists) {
                throw new HttpException('Organization already exists', HttpStatus.CONFLICT);
            }
            //request.organizationLogoURL = `${orgUniqueId}.jpg`;
            return await this.commonService.createOrganization(request, orgUniqueId, user);
        } catch (error) {
            throw error;
        }

    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async listOfOrganizations(pageNumber: string, pageLimit: string): Promise<any> {
        try {
            return this.commonService.listOfOrganizations(pageNumber, pageLimit)
        } catch (error) {
            throw error;;
        }
    }

    /**
     * 
     * @param empUniqId 
     */
    async getOrganizationByEmpId(empUniqId: string): Promise<any> {
        try {
            // get organization id by empId
            const orgId = await this.commonService.getOrganizationIdByEmpId(empUniqId);
            return await this.commonService.getOrganizationByOrgId(orgId);
            ;
        } catch (error) {
            throw error;;
        }
    }

    /**
     * 
     * @param orgId 
     */
    async getOrganizationByOrgId(orgId: string): Promise<any> {
        try {
            return await this.commonService.getOrganizationByOrgId(orgId);
        } catch (error) {
            throw error;;
        }
    }

    /**
     * 
     * @param orgId 
     */
    async deleteOrganizationByOrgId(orgId: string): Promise<any> {
        try {
            // check organization exist or not
            await this.commonService.getOrganizationByOrgId(orgId);
            return await this.commonService.deleteOrganizationByOrgId(orgId);
        } catch (error) {
            throw error;;
        }
    }
    /**
     * 
     * @param orgId 
     */
    async updateOrganizatonById(orgId: string): Promise<any> {
        try {
            // check organization exist or not
            await this.commonService.getOrganizationByOrgId(orgId);
            // udpate organization details byId
            return await this.commonService.updateOrganizationbyOrgId(orgId);
        } catch (error) {
            throw error;;
        }
    }
}