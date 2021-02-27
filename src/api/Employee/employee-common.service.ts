import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { CompanyInterface } from "../Company/interfaces/company.interface";
import { EmployeePermission } from "./interfaces/employee-permissions.interface";
import { EmployeeInterface } from "./interfaces/employee.interface";
import * as Employee from '../../config/employee.default';
import { DepartmentInterface } from "../Department/interfaces/department.interface";



Injectable()
export class EmployeeCommonService {
    constructor(
        @Inject('EMPLOYEE_MODEL')
        private employeeModel: Model<EmployeeInterface>,
        @Inject('COMPANY_MODEL')
        private companyModel: Model<CompanyInterface>,
        @Inject('EMPLOYEE_PERMISSIONS_MODEL')
        private empPermissionsModel: Model<EmployeePermission>,
        @Inject('DEPARTMENT_MODEL')
        private departmentModel: Model<DepartmentInterface>
    ) { }

    /**
     * 
     * @param username 
     */
    async checkUserAlreadyExists(username: string): Promise<any> {
        try {
            return await this.employeeModel.findOne({ $and: [{ $or: [{ userName: username.toLocaleLowerCase() }, { email: username.toLocaleLowerCase() }, { empId: username }] }, { isActive: true }] })
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param email 
     * @param empId 
     * @param userName 
     */
    async checkEmployeeExists(email: string, empId: string, userName: string) {
        return await this.employeeModel.findOne({ $or: [{ email: email.toLocaleLowerCase() }, { userName: userName.toLocaleLowerCase() }, { empId: empId }] })
    }

    /**
     * 
     * @param request 
     * @param createdBy 
     * @param empUniqueId 
     * @param decryptPassword 
     */
    async createEmployee(request, createdBy, empUniqueId, decryptPassword) {
        try {
            request['createdBy'] = createdBy;
            request['empUniqueId'] = empUniqueId;
            request['password'] = decryptPassword;
            const emp = new this.employeeModel(request);
            return await emp.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empId 
     */
    async getEmployeeById(empId: string) {
        const emp = await this.employeeModel.findOne({ empUniqueId: empId });
        if (!emp) throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
        return emp;
    }

    /**
     * 
     * @param newPassowrd 
     * @param empId 
     */
    async updatePassword(newPassowrd: string, empId: string) {
        return await this.employeeModel.updateOne({ empUniqueId: empId }, { $set: { password: newPassowrd, isFirstTimeLogin: false } });
    }

    /**
     * 
     * @param permissions 
     * @param roles 
     * @param empId 
     */
    async updateEmpPermissions(permissions: string[], roles: string[], empId: string) {
        try {
            await this.empPermissionsModel.updateOne({ empUniqueId: empId }, { $set: { permissions: permissions } })
            return await this.empPermissionsModel.updateOne({ empUniqueId: empId }, { $set: { "roles": roles } })

        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param companyUniqeId 
     */
    async getCompanyImageURL(companyUniqeId: string) {
        try {
            return await this.companyModel.findOne({ companyUniqeId: companyUniqeId }, { companyLogoURL: 1 })
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async getEmployeesList(pageNumber, pageLimit) {
        try {
            const limit = parseInt(pageLimit, 10) || 10; // limit to number
            const page = parseInt(pageNumber) + 1 || 1; // pageNumber
            const skip = (page - 1) * limit;// parse the skip to number
            const totalEmployees = await this.employeeModel.find({ isActive: true });
            const empResponse = await this.employeeModel.aggregate([
                {
                    $match: { $and: [{ userName: { $ne: 'superadmin' } }, { isActive: true }] }
                },
                {
                    $lookup:
                    {
                        from: "employeepermissions",
                        localField: "empUniqueId",
                        foreignField: "empUniqueId",
                        as: "employeePermissions"
                    }

                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ])
            // const empResponse = await this.employeeModel.find({ $and: [{ userName: { $ne: 'superadmin' } }, { isActive: true }] })
            //     .skip(skip)                 // use 'skip' first
            //     .limit(limit)
            if (empResponse.length === 0) {
                throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
            }
            return {
                pageNo: pageNumber,
                pageLimit: limit,
                totalEmployees: totalEmployees.length,
                employees: empResponse
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empUniqueId 
     */
    async getEmployeeByEMPId(empUniqueId: string) {
        try {
            const employee = await this.employeeModel.aggregate([
                {
                    $match: { $and: [{ empUniqueId: empUniqueId }, { isActive: true }] }
                },
                {
                    $lookup:
                    {
                        from: "employeepermissions",
                        localField: "empUniqueId",
                        foreignField: "empUniqueId",
                        as: "employeePermissions"
                    }

                }
            ]);

            if (!employee) {
                return 'Employee not existed';
            }
            return {
                pageNo: 1,
                pageLimit: 10,
                totalEmployees: employee.length,
                employees: employee
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param searchEmp 
     */
    async searchEmployee(searchEmp: string) {
        try {
            const regEx = new RegExp(searchEmp, 'i')
            return await this.employeeModel.find({ $and: [{ $or: [{ empId: regEx }, { userName: regEx }, { email: regEx }] }, { isActive: true }, { userName: { $ne: 'superadmin' } }] })
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empId string
     * @param empUniqueId string
     * @param permissions string
     * @param roles string
     */
    async crateEmpPermissions(empId: string, empUniqueId: string) {
        try {
            const permissions = [Employee.employeeDefaultAction];
            const roles = [Employee.employeeRole];
            const empRolesAndPermissions = this.empPermissionsModel({ empId, empUniqueId, permissions, roles });
            return await empRolesAndPermissions.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empUniqueId string
     */
    async getEmployeePermissions(empUniqueId: string) {
        try {
            return await this.empPermissionsModel.findOne({ empUniqueId }, { permissions: 1, roles: 1 })
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empUniqueId string
     * @param empOldData any
     * @param empNewData any
     */
    async updateEmployee(empUniqueId: string, empNewData: any, empOldData: any) {
        try {
            delete empOldData.employeeAddress;
            const newData = { ...empOldData, ...empNewData };
            delete newData._id;
            delete newData.__v;
            newData.updateOn = new Date().toISOString();
            const update = await this.employeeModel.updateOne({ empUniqueId: empUniqueId }, { $set: newData });
            if (update.ok) return 'Employee updated successfully.';
            else return 'Employee update failed.'
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param orgId string
     * @param pageNumber string
     * @param pageLimit string
     */
    async getEmpListByOrgId(orgId: string, pageNumber: string, pageLimit: string) {
        try {
            const limit = parseInt(pageLimit, 10) || 10; // limit to number
            const page = parseInt(pageNumber) + 1 || 1; // pageNumber
            const skip = (page - 1) * limit;// parse the skip to number
            const totalEmployees = await this.employeeModel.find({ $and: [{ userName: { $ne: 'superadmin' } }, { isActive: true }, { 'organization.id': orgId }] });
            const empResponse = await this.employeeModel.aggregate([
                {
                    $match: { $and: [{ userName: { $ne: 'superadmin' } }, { isActive: true }, { 'organization.id': orgId }] }
                },
                {
                    $lookup:
                    {
                        from: "employeepermissions",
                        localField: "empUniqueId",
                        foreignField: "empUniqueId",
                        as: "employeePermissions"
                    }

                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ])
            // const empResponse = await this.employeeModel.find({ $and: [{ userName: { $ne: 'superadmin' } }, { isActive: true }] })
            //     .skip(skip)                 // use 'skip' first
            //     .limit(limit)
            if (empResponse.length === 0) {
                throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
            }
            return {
                pageNo: pageNumber,
                pageLimit: limit,
                totalEmployees: totalEmployees.length,
                employees: empResponse
            }
        } catch (error) {
            throw error;
        }
    }
}