import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmployeeInterface } from './api/Employee/interfaces/employee.interface';
import { UtilService } from './api/Utils/utils.service';
import * as Admin from './config/employee.default';

@Injectable()
export class AppService {

  constructor(
    @Inject('EMPLOYEE_MODEL')
    private employeeModel: Model<EmployeeInterface>,
    private utilService: UtilService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  /**
   *  check super admin already exists;
   */
  async checkSuperAdminExists(): Promise<any> {
    try {
      return await this.employeeModel.findOne({ $and: [{ employeeUserName: Admin.superAdminUsername }, { employeePassword: Admin.superAdminPassword }] })
    } catch (error) {
      throw error;
    }
  }

  /**
   * create super admin
   */
  async createSuperAdmin(): Promise<any> {
    try {
      // encrypt password 
      const decryptPassword = await this.utilService.passwordEncrypt(Admin.superAdminPassword);
      const superAdminRequest = {
        employeeUserName: Admin.superAdminUsername,
        employeePassword: decryptPassword,
        employeeRoles: ['SUPER_ADMIN'],
        employeeActions: ['*']
      }
      const superAdmin = new this.employeeModel(superAdminRequest);
      return await superAdmin.save();
    } catch (error) {
      throw error;
    }
  }
}
