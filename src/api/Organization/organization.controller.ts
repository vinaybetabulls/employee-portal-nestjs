import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { OrganizationRequestDto } from "./dto/organization.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { OrganizationService } from "./organization.service";

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService){}

    @Post('/')
    @ApiOperation({ summary: 'Create Organization' })    
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: OrganizationRequestDto })
    @UseInterceptors(FileInterceptor('file'))
    async createOrganization(@Body() request: OrganizationRequestDto, @UploadedFile() file: { buffer: Buffer, mimetype: 'image/*', originalname: string }) {
        try {
            console.log(request);
            console.log('file..', file)
            return await this.organizationService.createOrganization(request);
        } catch (error) {
            return error;
        }
    }
}
