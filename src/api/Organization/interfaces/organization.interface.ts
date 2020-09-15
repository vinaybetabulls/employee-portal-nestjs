import { Document } from 'mongoose';


export interface OrgAddress {
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
};

export interface OrgContactPerson {
    name: string;
    phone: string;
}

export interface OrganizationInterface extends Document {
    orgUniqueId: string;
    readonly organizationName: string;
    readonly organizationCode: number;
    readonly organizationAddress: OrgAddress[];
    readonly organizationContactPerosn: OrgContactPerson;
    readonly organizationEmail: string;
    readonly organizationPhone: string;
    readonly organizationLogoURL: string;
}