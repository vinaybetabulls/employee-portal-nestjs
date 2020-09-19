import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { EmployeeInterface } from "../Employee/interfaces/employee.interface";
import { CompanyRequestDto } from "./dto/company.request.dto";
import { CompanyInterface } from "./interfaces/company.interface";


@Injectable()
export class CompanyCommonService {
    constructor(@Inject('COMPANY_MODEL') private companyModel: Model<CompanyInterface>, @Inject('EMPLOYEE_MODEL') private empModel: Model<EmployeeInterface>) { }

    /**
     * 
     * @param company 
     * @param companyUniqueid 
     * @param createdBy 
     */
    async createCompany(company: CompanyRequestDto, companyUniqeId: string, createdBy: any) {
        company['companyUniqeId'] = companyUniqeId;
        company['createdBy'] = createdBy;
        const companyObj = new this.companyModel(company);
        return await companyObj.save();
    }

    /**
     * 
     * @param companyCode 
     */
    async checkCompanyExistsByCode(companyCode: string) {
        return await this.companyModel.findOne({ $and: [{ companyCode: companyCode }, { isActive: true }] })
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async getCompaniesList(pageNumber: string, pageLimit: string) {
        const limit = parseInt(pageLimit, 10) || 10; // limit to number
        const page = parseInt(pageNumber) || 1; // pageNumber
        const skip = (page - 1) * limit;// parse the skip to number
        const companyResponse = await this.companyModel.find({ isActive: true }).find({})
            .skip(skip)                 // use 'skip' first
            .limit(limit)
        if (companyResponse.length === 0) {
            throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
        }
        return {
            pageNo: pageNumber,
            pageLimit: limit,
            totalCompanies: companyResponse.length,
            companies: companyResponse
        }
    }

    /**
     * 
     * @param companyId 
     */
    async getCompanyById(companyId: string) {
        const company = await this.companyModel.findOne({ $and: [{ companyUniqeId: companyId }, { isActive: true }] });
        if (!company) {
            throw new HttpException('Company not existed', HttpStatus.NOT_FOUND);
        }
        return company;
    }

    /**
     * 
     * @param companyId 
     */
    async deleteCompanyById(companyId: string) {
        const updated = await this.companyModel.updateOne({ orgUniqueId: companyId }, { $set: { isActive: false } });
        if (updated.ok) {
            return 'Company deleted successfully'
        }
        return 'Failed to delete organization'
    }

    /**
     * 
     * @param empId 
     */
    async getCompanyIdOfEmp(empId: string) {
        const { company: { id } } = await this.empModel.findOne({ empUniqueId: empId }, { company: 1, _id: 0 })
        console.log('company..', id)
        if (!id) {
            throw new HttpException('No companies found for employee', HttpStatus.NOT_FOUND);
        }
        return id;
    }
}