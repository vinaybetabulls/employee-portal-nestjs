import { Injectable } from "@nestjs/common";
import { EmployeeDto } from "./dto/employee.dto";



@Injectable()

export class EmployeeService {

    async employeeLogin(request: EmployeeDto): Promise<any> {
        try {
            return request
        } catch (error) {
            throw error;
        }
    }
}