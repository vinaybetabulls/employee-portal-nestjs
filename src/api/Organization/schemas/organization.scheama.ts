import * as mongoose from 'mongoose';

/**
 * @name: OrganizationSchema
 */
export const OrganizationSchema = new mongoose.Schema({
  orgUniqueId: { type: String, required: true },
  organizationName: { type: String, required: true },
  organizationCode: { type: String, required: true },
  organizationEmail: { type: String, required: true },
  organizationPhone: { type: String, required: true },
  organizationAddress: [{
    address: String,
    city: String,
    state: String,
    country: String,
    zipcode: Number
  }],
  organizationContactPerson: {
    name: String,
    phone: String
  },
  organizationLogoURL: String,
  isActive: { type: Boolean, default: true },
  createdBy: {
    empUniqueId: { type: String },
    empUserName: { type: String }
  }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } });