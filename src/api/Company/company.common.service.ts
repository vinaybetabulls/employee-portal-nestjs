import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { DepartmentInterface } from "../Department/interfaces/department.interface";
import { EmployeeInterface } from "../Employee/interfaces/employee.interface";
import { CompanyRequestDto } from "./dto/company.request.dto";
import { CompanyInterface } from "./interfaces/company.interface";


@Injectable()
export class CompanyCommonService {
    constructor(@Inject('COMPANY_MODEL') private companyModel: Model<CompanyInterface>, @Inject('EMPLOYEE_MODEL') private empModel: Model<EmployeeInterface>, @Inject('DEPARTMENT_MODEL') private departmentModel: Model<DepartmentInterface>) { }

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
        const page = parseInt(pageNumber) + 1 || 1; // pageNumber
        const skip = (page - 1) * limit;// parse the skip to number
        const totalCompanies = await this.companyModel.find({ isActive: true });
        const companyResponse = await this.companyModel.aggregate([
            {
                '$match': {
                    isActive: true
                }
            }, {
                '$lookup': {
                    'from': 'organizations',
                    'localField': 'companyOrganizationId',
                    'foreignField': 'orgUniqueId',
                    'as': 'organizations'
                }
            }, {
                '$unwind': {
                    'path': '$organizations'
                }
            }, {
                '$project': {
                    'organizationName': '$organizations.organizationName',
                    'companyCode': 1,
                    'companyName': 1,
                    'companyUniqeId': 1,
                    'isActive': 1,
                    'companyEmail': 1,
                    'companyPhone': 1,
                    'companyLogoURL': 1,
                    'companyDescription': 1,
                    'companyOrganizationId': 1,
                    'companyAddress': 1
                }
            }
            ,
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);
        if (companyResponse.length === 0) {
            throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
        }
        return {
            pageNo: pageNumber,
            pageLimit: limit,
            totalCompanies: totalCompanies.length,
            companies: companyResponse
        }
    }

    /**
     * 
     * @param companyId 
     */
    async getCompanyById(companyId: string) {
        // const company = await this.companyModel.find({ $and: [{ companyUniqeId: companyId }, { isActive: true }] });
        const company = await this.companyModel.aggregate([
            {
                '$match': {
                    '$and': [
                        {
                            'companyUniqeId': companyId
                        }, {
                            'isActive': true
                        }
                    ]
                }
            }, {
                '$lookup': {
                    'from': 'organizations',
                    'localField': 'companyOrganizationId',
                    'foreignField': 'orgUniqueId',
                    'as': 'organizations'
                }
            }, {
                '$unwind': {
                    'path': '$organizations'
                }
            }, {
                '$project': {
                    'organizationName': '$organizations.organizationName',
                    'companyCode': 1,
                    'companyName': 1,
                    'companyUniqeId': 1,
                    'isActive': 1,
                    'companyEmail': 1,
                    'companyPhone': 1,
                    'companyLogoURL': 1,
                    'companyDescription': 1,
                    'companyOrganizationId': 1,
                    'companyAddress': 1
                }
            }
        ])
        const departments = await this.departmentModel.find({ companiesList: { $in: [companyId] } })
        if (!company) {
            throw new HttpException('Company not existed', HttpStatus.NOT_FOUND);
        }
        return {
            pageNo: 1,
            pageLimit: 10,
            totalCompanies: company.length,
            companies: company,
            department: departments
        };
    }
    /**
     * 
     * @param companyId 
     */
    async getCompanyUniqById(companyId: string) {
        const company = await this.companyModel.find({ $and: [{ companyUniqeId: companyId }, { isActive: true }] });
        const departments = await this.departmentModel.find({ companiesList: { $in: [companyId] } })
        if (!company) {
            throw new HttpException('Company not existed', HttpStatus.NOT_FOUND);
        }
        return {
            companies: company,
            department: departments
        };
    }

    /**
     * 
     * @param companyId 
     */
    async deleteCompanyById(companyId: string) {
        const updated = await this.companyModel.updateOne({ companyUniqeId: companyId }, { $set: { isActive: false } });
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
        const { company: { id } } = await this.empModel.findOne({ empUniqueId: empId }, { company: 1, _id: 0 });
        if (!id) {
            throw new HttpException('No companies found for employee', HttpStatus.NOT_FOUND);
        }
        return id;
    }

    /**
     * 
     * @param orgUniqgId 
     */
    async getCompaniesByOrgId(orgUniqgId: string) {
        return await this.companyModel.find({ companyOrganizationId: orgUniqgId }, { companyUniqeId: 1, companyName: 1 });
    }

    /**
     * 
     * @param companyId string
     * @param updateData CompanyRequestDto
     * @param oldData any
     */
    async updateCompanyById(companyId: string, updateData: CompanyRequestDto, oldData: any) {
        try {
            const newData = { ...oldData, ...updateData };
            delete newData._id;
            delete newData.companyName;
            delete newData.companyCode;
            delete newData.__v;
            newData.updatedOn = new Date().toISOString();
            const update = await this.companyModel.updateOne({ companyUniqeId: companyId }, { $set: { companyEmail: newData.companyEmail, companyDescription: newData.companyDescription, companyAddress: newData.companyAddress, companyOrganizationId: newData.companyOrganizationId, companyLogoURL: newData.companyLogoURL } })
            if (update.ok) {
                return 'Company updated successfully'
            }
            else {
                return 'Company update failed'
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empUniqueId 
     */
    async getEmployeeOrganization(empUniqueId: string) {
        try {
            return await this.empModel.findOne({ empUniqueId: empUniqueId }, { organization: 1, empUniqueId: 1 });
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param organizationId string
     * @param pageNumber string
     * @param pageLimit string
     */
    async getCompanyByOrganizaitonId(organizationId: string, pageNumber: string, pageLimit: string) {
        try {
            const limit = parseInt(pageLimit, 10) || 10; // limit to number
            const page = parseInt(pageNumber) + 1 || 1; // pageNumber
            const skip = (page - 1) * limit;// parse the skip to number
            const totalCompanies = await this.companyModel.find({
                $and: [{
                    isActive: true,

                }, { companyOrganizationId: organizationId }]
            });
            const companyResponse = await this.companyModel.aggregate([
                {
                    '$match': {
                        $and: [{
                            isActive: true,

                        }, { companyOrganizationId: organizationId }]
                    }
                }, {
                    '$lookup': {
                        'from': 'organizations',
                        'localField': 'companyOrganizationId',
                        'foreignField': 'orgUniqueId',
                        'as': 'organizations'
                    }
                }, {
                    '$unwind': {
                        'path': '$organizations'
                    }
                }, {
                    '$project': {
                        'organizationName': '$organizations.organizationName',
                        'companyCode': 1,
                        'companyName': 1,
                        'companyUniqeId': 1,
                        'isActive': 1,
                        'companyEmail': 1,
                        'companyPhone': 1,
                        'companyLogoURL': 1,
                        'companyDescription': 1,
                        'companyOrganizationId': 1,
                        'companyAddress': 1
                    }
                }
                ,
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);
            if (companyResponse.length === 0) {
                throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
            }
            return {
                pageNo: pageNumber,
                pageLimit: limit,
                totalCompanies: totalCompanies.length,
                companies: companyResponse
            }
        } catch (error) {
            throw error;
        }
    }
}