import * as mongoose from 'mongoose';

/**
 * @name: DesignationSchema
 */
export const DesignationSchema = new mongoose.Schema({
  desgUniqueId: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  rolesAndResponsibilities: { type: String, required: true },
  notesURL: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } });