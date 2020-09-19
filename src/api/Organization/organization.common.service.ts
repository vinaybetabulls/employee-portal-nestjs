import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { OrganizationRequestDto } from "./dto/organization.dto";
import { OrganizationInterface } from "./interfaces/organization.interface";


@Injectable()

export class OrganizationCommonService {
    constructor(
        @Inject('ORGANIZATION_MODEL')
        private organizationModel: Model<OrganizationInterface>,
    ) { }
    /**
     * 
     * @param organizaiton 
     * @param orgUniqueId 
     * @param user 
     */
    async createOrganization(organizaiton: OrganizationRequestDto, orgUniqueId: string, user: any) {
        organizaiton['orgUniqueId'] = orgUniqueId;
        organizaiton['createdBy'] = user;
        const org = new this.organizationModel(organizaiton);
        return await org.save();
    }

    /**
     * 
     * @param organizationCode 
     */
    async isOrganizationExists(organizationCode: string) {
        return this.organizationModel.findOne({ organizationCode: organizationCode })
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async listOfOrganizations(pageNumber: string, pageLimit: string) {
        const limit = parseInt(pageLimit, 10) || 10; // limit to number
        const page = parseInt(pageNumber) || 1; // pageNumber
        const skip = (page - 1) * limit;// parse the skip to number
        const orgResponse = await this.organizationModel.find({ isActive: true }).find({})
            .skip(skip)                 // use 'skip' first
            .limit(limit)
        if (orgResponse.length === 0) {
            throw new HttpException('No organizations found', HttpStatus.NOT_FOUND);
        }
        return {
            pageNo: pageNumber,
            pageLimit: limit,
            totalCompanies: orgResponse.length,
            organizations: orgResponse
        }
    }

    /**
     * 
     * @param orgId 
     */
    async getOrganizationByOrgId(orgId: string) {
        const org = await this.organizationModel.findOne({ $and: [{ orgUniqueId: orgId }, { isActive: true }] });
        if (!org) {
            throw new HttpException('Organization not existed', HttpStatus.NOT_FOUND);
        }
        return org;
    }

    /**
     * 
     * @param orgId 
     */
    async deleteOrganizationByOrgId(orgId: string) {
        const updated = await this.organizationModel.updateOne({ orgUniqueId: orgId }, { $set: { isActive: false } });
        if (updated.ok) {
            return 'Organization deleted successfully'
        }
        return 'Failed to delete organization'
    }

    /**
     * 
     * @param orgId 
     */
    async updateOrganizationbyOrgId(orgId: string) {
        // Todo
        return orgId;

    }
}