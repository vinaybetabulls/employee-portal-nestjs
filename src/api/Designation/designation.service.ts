import { DesignationInterface } from './interfaces/designation.interface';
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { DesignationDTO } from './dto/designation.dto';


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
      const designationsResponse = await this.designationModel.find({ isActive: true })
        .skip(skip)                 // use 'skip' first
        .limit(limit)
        .sort({ _id: -1 })
      if (designationsResponse.length === 0) {
        throw new HttpException('No designations found', HttpStatus.NOT_FOUND);
      }
      return {
        pageNo: pageNumber,
        pageLimit: limit,
        totalCompanies: designationsResponse.length,
        designations: designationsResponse
      }
    } catch (error) {
      throw error;;
    }
  }

  /**
     * 
     * @param request 
     * @param file 
     */
  async createDesignation(request: DesignationDTO, user: any): Promise<any> {
    try {
      const desgUniqueId = uuid();
      // check designation already exists
      const desgName = request.name;
      const isDesgExists = await this.designationModel.findOne({ name: desgName })
      if (isDesgExists) {
        throw new HttpException('Designation already exists', HttpStatus.CONFLICT);
      }
      request['desgUniqueId'] = desgUniqueId;
      request['createdBy'] = user;
      const desg = new this.designationModel(request);
      return await desg.save();
      //return await this.commonService.createOrganization(request, orgUniqueId, user);
    } catch (error) {
      throw error;
    }
  }

  /**
     * 
     * @param desgUniqueId 
     */
  async getDesignationByDesgId(desgUniqueId: string): Promise<any> {
    try {
      const designation = await this.designationModel.findOne({ $and: [{ desgUniqueId: desgUniqueId }, { isActive: true }] });
      if (!designation) {
        throw new HttpException('Designation not existed', HttpStatus.NOT_FOUND);
      }
      return {
        pageNo: 1,
        pageLimit: 10,
        totalCompanies: 1,
        organizations: [designation]
      }
    } catch (error) {
      throw error;;
    }
  }

  /**
     * 
     * @param desgUniqueId 
     */
  async updateDesignationById(desgUniqueId: string): Promise<any> {
    try {
      return desgUniqueId;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param desigUniqId 
   */
  async deleteDesignationbyId(desigUniqId: string): Promise<any> {
    try {
      const designation = await this.designationModel.findOne({ desgUniqueId: desigUniqId });
      if (!designation) {
        throw new HttpException('Designation not existed', HttpStatus.NOT_FOUND);
      }
      const deleted = await this.designationModel.updateOne({ desgUniqueId: desigUniqId }, { $set: { isActive: false } });
      if (deleted) {
        return { message: 'Designation deleted', status: HttpStatus.OK }
      }
    } catch (error) {
      throw error;
    }

  }

}
