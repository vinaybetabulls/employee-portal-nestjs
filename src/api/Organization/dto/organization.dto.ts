
import { IsArray, IsNotEmptyObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class OrganizationAddress {
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

export class OrganizationContactPerson {
    @IsString()
    @ApiProperty({ name: 'name', description: 'Contact Person Name' })
    name!: string
    @IsString()
    @ApiProperty({ name: 'phone', description: 'Contact Person Phone' })
    phone!: string
}

export class OrganizationRequestDto {

    @IsString()
    @ApiProperty({ name: 'organizationCode', description: 'Organization Code' })
    organizationCode!: string;
    @IsString()
    @ApiProperty({ name: 'organizationName', description: 'Organization Name' })
    organizationName!: string;
    @IsString()
    @ApiProperty({ name: 'organizationEmail', description: 'Organization Email' })
    organizationEmail!: string;
    @IsString()
    @ApiProperty({ name: 'organizationPhone', description: 'Organization Phone' })
    organizationPhone!: string;

    @ApiProperty({ name: 'organizationAddress', description: 'Organization Address', type: [OrganizationAddress] })
    @IsArray()
    organizationAddress: OrganizationAddress;

    @IsNotEmptyObject()
    @ApiProperty({ name: 'organizationContactPerson', description: 'Contact Person Name' })
    organizationContactPerson: OrganizationContactPerson;

    @IsString()
    @ApiProperty({ name: 'organizationLogoURL', description: 'Organizaition Logo URL' })
    organizationLogoURL!: string;
}