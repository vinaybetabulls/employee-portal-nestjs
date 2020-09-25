
import { IsArray, IsNotEmptyObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyAddress {
    @IsString()
    @ApiProperty({ name: 'address', description: 'address', example: '#123, Building 20, Mindspace' })
    address!: string;
    @IsString()
    @ApiProperty({ name: 'city', description: 'City' })
    city!: string;
    @IsString()
    @ApiProperty({ name: 'state', description: 'State' })
    state!: string;
    @IsString()
    @ApiProperty({ name: 'country', description: 'Country' })
    country!: string;
    @IsString()
    @ApiProperty({ name: 'zipcode', description: 'Zipcode' })
    zipcode!: string;
}

export class CompanyContactPerson {
    @IsString()
    @ApiProperty({ name: 'name', description: 'Contact Person Name' })
    name!: string
    @IsString()
    @ApiProperty({ name: 'phone', description: 'Contact Person Phone' })
    phone!: string
}
/**\
 *  @name CompanyRequestDto 
 */
export class CompanyRequestDto {
    @IsString()
    @ApiProperty({ name: 'companyName', description: 'Company Name', required: true })
    companyName!: string;

    @IsString()
    @ApiProperty({ name: 'companyCode', description: 'Company Code', required: true })
    companyCode!: string;

    @IsString()
    @ApiProperty({ name: 'companyOrganizationId', description: 'Company belongs orgId', required: true })
    companyOrganizationId!: string;

    @IsString()
    @ApiProperty({ name: 'companyEmail', description: 'Company Email' })
    companyEmail!: string;

    @IsString()
    @ApiProperty({ name: 'companyPhone', description: 'Company Phone' })
    companyPhone!: string;

    @IsArray()
    @ApiProperty({ name: 'companyAddress', description: 'Company Address', type: [CompanyAddress] })
    companyAddress!: CompanyAddress

    @IsNotEmptyObject()
    @ApiProperty({ name: 'companyContactPerson', description: "Company Contact person", type: CompanyContactPerson })
    companyContactPerson!: CompanyContactPerson

    @IsString()
    @ApiProperty({ name: 'companyDescription', description: 'Company information', required: false })
    companyDescription: string

    @IsString()
    @ApiProperty({ name: 'companyLogoURL', description: 'Company Logo URL' })
    companyLogoURL!: string;

    @ApiProperty({ name: 'rulesAndRegulationsURL', description: 'Company Rules and Regulation doc URL', required: false })
    rulesAndRegulationsURL?: string
}