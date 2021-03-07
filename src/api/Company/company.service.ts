import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CompanyCommonService } from "./company.common.service";
import { CompanyRequestDto } from "./dto/company.request.dto";



@Injectable()
export class CompanyService {
    constructor(private commonService: CompanyCommonService) { }
    /**
     * 
     * @param request 
     */
    async createCompany(request: CompanyRequestDto, user: any): Promise<any> {
        try {
            const companyUniqeId = uuid();
            request.companyEmail = (request.companyEmail).toLocaleLowerCase();
            // chcek company is already exists by company code
            const company = await this.commonService.checkCompanyExistsByCode(request.companyCode);
            if (company) {
                throw new HttpException('Company already exists', HttpStatus.CONFLICT);
            }
            return await this.commonService.createCompany(request, companyUniqeId, user)
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async getCompaniesList(pageNumber: string, pageLimit: string, search = null): Promise<any> {
        try {
            return await this.commonService.getCompaniesList(pageNumber, pageLimit, search);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param companyId 
     */
    async getCompanyById(companyId: string): Promise<any> {
        try {
            return await this.commonService.getCompanyById(companyId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param companyId 
     */
    async deleteCompanyById(companyId: string): Promise<any> {
        try {
            // check company exists or not
            await this.commonService.getCompanyById(companyId);
            // delete company
            return this.commonService.deleteCompanyById(companyId)
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empId 
     */
    async getCompanyByEmpId(empId: string) {
        try {
            // get companyId
            const companyId = await this.commonService.getCompanyIdOfEmp(empId);
            return await this.commonService.getCompanyById(companyId);

        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param orgUniqId 
     */
    async getCompaniesByOrgId(orgUniqId: string) {
        try {
            return await this.commonService.getCompaniesByOrgId(orgUniqId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param companyUniqeId string
     * @param request CompanyRequestDto
     */
    async updateCompanyById(companyUniqeId: string, request: CompanyRequestDto) {
        try {
            // check company exists or not
            const companyResponse = await this.commonService.getCompanyUniqById(companyUniqeId);
            await this.commonService.updateCompanyById(companyUniqeId, request, companyResponse.companies[0].toJSON())
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empUiqId string
     * @param pageNumbesr tring
     * @param pageLimit string
     */
    async getCompaniesByAdminOrganization(empUiqId: string, pageNumber: string, pageLimit: string): Promise<any> {
        try {
            // get empOrg
            const employeeOrganization = await this.commonService.getEmployeeOrganization(empUiqId);
            // get companiesList by organizationId
            const organizationId = (employeeOrganization.toJSON()).organization.id;
            return await this.commonService.getCompanyByOrganizaitonId(organizationId, pageNumber, pageLimit);

        } catch (error) {
            throw error;
        }
    }
}