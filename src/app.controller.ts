import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async createSuperAdmin() {
    try {
      const isExists = await this.appService.checkSuperAdminExists();
      let superAdmin;
      if (!isExists) {
        // create super admin;
        superAdmin = await this.appService.createSuperAdmin();
      }
      return isExists || superAdmin;
    } catch (error) {
      throw error;
    }
  }
}
