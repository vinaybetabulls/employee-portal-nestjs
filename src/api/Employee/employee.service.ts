import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UtilService } from "../Utils/utils.service";
import { EmployeeLoginDto } from "./dto/employee.dto";
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
                empUniqueId: checkuserExists.empUniqueId
            }
            const jwt = await this.utilService.generateJSONToken(jwtPayload);
            return { jwt, roles: jwtPayload.roles, permissions: jwtPayload.permissions };

        } catch (error) {
            throw error;
        }
    }
}