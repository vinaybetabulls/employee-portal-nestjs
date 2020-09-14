import { Injectable } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.dto";


@Injectable()

export class OrganizationService {
    /**
     * 
     * @param request 
     * @param file 
     */
    async createOrganization(request: OrganizationRequestDto) {
        console.log('request...', request)
        const { organizationCode, organizationEmail, organizationPhone, OrganizationName } = request;
        return {
            organizationCode,
            OrganizationName,
            organizationEmail,
            organizationPhone,
            organizationAddress: {
                address: request.address,
                city: request.city,
                state: request.state,
                country: request.country,
                zipcode: request.zipcode
            },
            organizationContactPerson: {
                name: request.name,
                phone: request.phone
            }
        }
    }
}