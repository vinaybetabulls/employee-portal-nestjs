import { DesignationInterface } from './interfaces/designation.interface';
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';


@Injectable()
export class DesignationService {
  constructor(
    @Inject('DESIGNATION_MODEL')
    private designationModel: Model<DesignationInterface>,
  ) { }
  /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
  async listOfDesignations(pageNumber: string, pageLimit: string): Promise<any> {
    try {
      const limit = parseInt(pageLimit, 10) || 10; // limit to number
      const page = parseInt(pageNumber) || 1; // pageNumber
      const skip = (page - 1) * limit;// parse the skip to number
      const orgResponse = await this.designationModel.find()
        .skip(skip)                 // use 'skip' first
        .limit(limit)
      if (orgResponse.length === 0) {
        throw new HttpException('No organizations found', HttpStatus.NOT_FOUND);
      }
      return {
        pageNo: pageNumber,
        pageLimit: limit,
        totalCompanies: orgResponse.length,
        organizations: orgResponse
      }
    } catch (error) {
      throw error;;
    }
  }
}
