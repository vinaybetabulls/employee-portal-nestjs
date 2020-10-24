import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmployeeInterface, UserPermission } from './api/Employee/interfaces/employee.interface';
import { UtilService } from './api/Utils/utils.service';
import * as Admin from './config/employee.default';
import { v4 as uuid } from 'uuid';
import { EmployeePermission } from './api/Employee/interfaces/employee-permissions.interface';

@Injectable()
export class AppService {

  constructor(
    @Inject('EMPLOYEE_MODEL')
    private employeeModel: Model<EmployeeInterface>,
    @Inject('EMPLOYEE_PERMISSIONS_MODEL')
    private empPermissionsModel: Model<EmployeePermission>,
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
      if (!admin) {
        return false;
      }
      return admin;
    } catch (error) {
      throw error;;
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
        empId: 'SUPERADMIN',
        userName: Admin.superAdminUsername,
        password: decryptPassword
      }
      // save super admin into employees collection
      const superAdmin = new this.employeeModel(superAdminRequest);
      const superAdminResponse = await superAdmin.save();
      const createPermissions = new this.empPermissionsModel({ empId: superAdminResponse.empId, empUniqueId: superAdminResponse.empUniqueId, permissions: [UserPermission.CREATE, UserPermission.DELETE, UserPermission.EDIT, UserPermission.VIEW], roles: [Admin.superAdminRole] })
      const permissions = await createPermissions.save();
      return { superAdminResponse, permissions }
    } catch (error) {
      throw error;;
    }
  }
}
