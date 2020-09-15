import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.dto";
import { v4 as uuid } from 'uuid';
import * as fs from "fs";
import * as path from 'path';
import { OrganizationCommonService } from "./organization.common.service";


@Injectable()

export class OrganizationService {

    constructor(private commonService: OrganizationCommonService) { }
    /**
     * 
     * @param request 
     * @param file 
     */
    async createOrganization(request: OrganizationRequestDto): Promise<any> {
        try {
            const orgUniqueId = uuid();
            // check organization already exists
            const isOrgExists = await this.commonService.isOrganizationExists(request.organizationCode);
            if(isOrgExists) {
                throw new HttpException('Organization already exists', HttpStatus.CONFLICT);
            }
            return await this.commonService.createOrganization(request, orgUniqueId);
        } catch (error) {
            throw error;
        }

    }
}