import * as mongoose from 'mongoose';

/**
 * @name: DesignationSchema
 */
export const DesignationSchema = new mongoose.Schema({
  desgUniqueId: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  rolesAndResponsibilites: { type: String, required: true },
  notesURL: { type: String, required: true },
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } });