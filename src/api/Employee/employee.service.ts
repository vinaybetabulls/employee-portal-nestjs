import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import * as Employee from '../../config/employee.default';
import { UtilService } from "../Utils/utils.service";
import { ChangePasswordDto } from "./dto/employee-change-pwd.dto";
import { EmployeeCreateDto, EmployeeLoginDto } from "./dto/employee.dto";
import { EmployeeCommonService } from "./employee-common.service";



@Injectable()

export class EmployeeService {
    constructor(private commonService: EmployeeCommonService, private utilService: UtilService) { }

    async employeeLogin(request: EmployeeLoginDto): Promise<any> {
        try {
            const checkuserExists = await this.commonService.checkUserAlreadyExists(request.username);
            if (!checkuserExists) {
                throw new HttpException('User not exists', HttpStatus.NOT_FOUND)
            }

            // decrypt password
            const decryptPassword = await this.utilService.decryptPassword(request.password, checkuserExists.password);
            if (!decryptPassword) {
                throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
            }
            // get permission and roles
            const { permissions, roles } = await this.commonService.getEmployeePermissions(checkuserExists.empUniqueId);
            // create jwt token
            const jwtPayload = {
                username: checkuserExists.userName,
                roles,
                permissions,
                empUniqueId: checkuserExists.empUniqueId,
                isFirstTimeLogin: false
            }
            const companyLogoURL = await this.commonService.getCompanyImageURL(checkuserExists.company.id);
            if (checkuserExists.userName === 'superadmin') {
                jwtPayload.isFirstTimeLogin = false;
            }
            else if (checkuserExists.isFirstTimeLogin === true && checkuserExists.userName !== 'superadmin') {
                jwtPayload.isFirstTimeLogin = true;
            }
            const jwt = await this.utilService.generateJSONToken(jwtPayload);
            return { jwt, roles: jwtPayload.roles, permissions: jwtPayload.permissions, isFirstTimeLogin: jwtPayload.isFirstTimeLogin, companyLogoURL: companyLogoURL ? companyLogoURL : null };

        } catch (error) {
            throw error;
        }
    }

    async createEmployee(request: EmployeeCreateDto, createdBy: any): Promise<any> {
        try {
            // check employee already existed
            const emp = await this.commonService.checkEmployeeExists(request.email, request.empId, request.userName);
            if (emp) {
                throw new HttpException('Employee already existed', HttpStatus.CONFLICT)
            }
            const empUniqueId = uuid(); // create employee unique Id
            request.email = ((request.email).toLocaleLowerCase()).trim();
            request.userName = ((request.userName).toLocaleLowerCase()).trim();
            if (request.dateOfJoining && request.dateOfJoining !== '') {
                request.dateOfJoining = new Date(request.dateOfJoining).toISOString(); // convert dobj to ISO format
            }
            if (request.dob && request.dob !== '') {
                request.dob = new Date(request.dob).toISOString(); // convert dob to ISO format
            }
            // password encryption
            const decryptPassword = await this.utilService.passwordEncrypt(Employee.employeePassword);
            // create employee
            const empResponse = await this.commonService.createEmployee(request, createdBy, empUniqueId, decryptPassword);
            // create permissions
            const permissions = await this.commonService.crateEmpPermissions(empResponse.empId, empResponse.empUniqueId);
            return { employee: permissions }
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empId 
     */
    async getEmployeeById(empId: string) {
        try {
            return await this.commonService.getEmployeeById(empId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param request 
     * @param empId 
     */
    async updatePassword(request: ChangePasswordDto, empId: string) {
        try {
            if (request.newPassword !== request.confirmPassword) {
                throw new HttpException('New password and confirm password should match', HttpStatus.BAD_REQUEST)
            }
            const empResponse = await this.commonService.getEmployeeById(empId);
            const decryptOldPassword = this.utilService.decryptPassword(request.oldPassword, empResponse.password);
            if (!decryptOldPassword) {
                throw new HttpException('Old password not matched', HttpStatus.BAD_REQUEST);
            }
            const encryptNewPassword = await this.utilService.passwordEncrypt(request.newPassword);
            return await this.commonService.updatePassword(encryptNewPassword, empId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param permission 
     * @param roles 
     * @param empId 
     */
    async updateEmpPermissions(permission: string[], roles: string[], empId: string) {
        try {
            // check empId is valid or not
            await this.commonService.getEmployeeById(empId);
            // update permissions and roles
            return await this.commonService.updateEmpPermissions(permission, roles, empId);

        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async getCompaniesList(pageNumber: string, pageLimit: string) {
        try {
            return await this.commonService.getEmployeesList(pageNumber, pageLimit);
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
            return await this.commonService.getEmployeeByEMPId(empUniqueId);
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
            return this.commonService.searchEmployee(searchEmp);
        } catch (error) {
            throw error;
        }
    }
}