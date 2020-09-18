import { Document } from 'mongoose';
export interface CompanyAddress {
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
};

export interface CompanyContactPerson {
    name: string;
    phone: string;
}
export interface CompanyInterface extends Document {
    readonly companyName: string,
    companyUniqeId: string;
    readonly companyCode: string;
    companyEmail: string;
    readonly companyOrganizationId: string;
    readonly companyPhone: string;
    readonly companyDescription: string;
    readonly companyAddress: CompanyAddress[];
    readonly companyContactPerson: CompanyContactPerson;
    readonly companyLogoURL: string;
    readonly rulesAndRegulationsURL: string;
    readonly isActvive: boolean;
}