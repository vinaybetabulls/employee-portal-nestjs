import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import * as Employee from '../../config/employee.default';
import { UtilService } from "../Utils/utils.service";
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

            // create jwt token
            const jwtPayload = {
                username: checkuserExists.userName,
                roles: checkuserExists.roles,
                permissions: checkuserExists.permissions,
                empUniqueId: checkuserExists.empUniqueId,
                isfirstTimeLogin: (checkuserExists.isFirstTimeLogin === true) ? true : undefined
            }
            const jwt = await this.utilService.generateJSONToken(jwtPayload);
            return { jwt, roles: jwtPayload.roles, permissions: jwtPayload.permissions };

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
            const empUniqueId = uuid();
            request.email = ((request.email).toLocaleLowerCase()).trim();
            request.userName = ((request.userName).toLocaleLowerCase()).trim();
            if (request.dateOfJoining && request.dateOfJoining !== '') {
                request.dateOfJoining = new Date(request.dateOfJoining).toISOString();
            }
            if (request.dob && request.dob !== '') {
                request.dob = new Date(request.dob).toISOString();
            }
            const decryptPassword = await this.utilService.passwordEncrypt(Employee.employeePassword);
            return this.commonService.createEmployee(request, createdBy, empUniqueId, decryptPassword);
        } catch (error) {
            throw error;
        }
    }
}