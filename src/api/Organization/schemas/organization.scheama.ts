import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  organizationName: {type: String, required: true},
  organizationCode: {type: String, required: true},
  organizationEmail: {type: String, required: true},
  organizationPhone: {type: String, required: true},
  organizationAddress: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipcode: Number
  },
  organizationContactPerson: {
      name: String,
      phone: String
  },
  organizationLogo: String

});