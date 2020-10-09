import * as mongoose from 'mongoose';

export const DepartmentSchema = new mongoose.Schema({
    departmentUniqueId: { type: String, required: true, unique: true },
    departmentName: { type: String, required: true },
    departmentCategory: { type: String, required: true },
    companiesList: { type: Array },
    createdBy: { type: Object },
    isActive: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })