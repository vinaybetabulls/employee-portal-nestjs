import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmployeeInterface, UserPermission } from './api/Employee/interfaces/employee.interface';
import { UtilService } from './api/Utils/utils.service';
import * as Admin from './config/employee.default';
import { v4 as uuid } from 'uuid';

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
      const admin = await this.employeeModel.findOne({ userName: (Admin.superAdminUsername).toLocaleLowerCase() });
      if(!admin) {
        return false;
      }
      return admin;
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
      // create superAdminRequest payload
      const superAdminRequest = {
        empUniqueId: uuid(),
        userName: Admin.superAdminUsername,
        password: decryptPassword,
        roles: [Admin.superAdminRole],
        permissions: [UserPermission.ADDITIONAL, UserPermission.CREATE, UserPermission.DELETE, UserPermission.EDIT, UserPermission.VIEW]
      }
      // save super admin into employees collection
      const superAdmin = new this.employeeModel(superAdminRequest);
      return await superAdmin.save();
    } catch (error) {
      throw error;
    }
  }
}
