import { Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { OrganizationRequestDto } from "./dto/organization.dto";

import { OrganizationInterface } from "./interfaces/organization.interface";

@Injectable()

export class OrganizationCommonService {
    constructor(
        @Inject('ORGANIZATION_MODEL')
        private organizationModel: Model<OrganizationInterface>,
    ) { }
    async createOrganization(organizaiton: OrganizationRequestDto, orgUniqueId: string) {
        organizaiton['orgUniqueId'] = orgUniqueId;
        const org = new this.organizationModel(organizaiton);
        return await org.save();
    }

    async isOrganizationExists(organizationCode: string) {
        return this.organizationModel.findOne({organizationCode: organizationCode})
    }
}