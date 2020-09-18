import * as mongoose from 'mongoose';

/**
 * @name: Company Scheam
 */
export const CompanySchema = new mongoose.Schema({
  companyUniqeId: { type: String, required: true },
  companyName: { type: String, required: true },
  companyCode: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyPhone: { type: String, required: true },
  companyOrganizationId: { type: String, required: true },
  companyDescription: { type: String },
  companyAddress: [{
    address: String,
    city: String,
    state: String,
    country: String,
    zipcode: Number
  }],
  contactPerson: {
    name: String,
    phone: String
  },
  companyLogoURL: { type: String, required: true },
  rulesAndRegulationsURL: { type: String },
  isActive: { type: String, default: true },

}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } });