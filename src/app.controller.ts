import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async createSuperAdmin() {
    try {
      const isExists =  await this.appService.checkSuperAdminExists();
      if(!isExists) {
        // create super admin;
        await this.appService.createSuperAdmin();
      }
      return isExists;
    } catch (error) {
      return error;
    }
  }
}
