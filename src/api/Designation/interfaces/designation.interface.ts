import { Document } from 'mongoose';

export interface DesignationInterface extends Document {
  desgUniqueId: string;
  readonly name: string;
  readonly level: number;
  readonly rolesAndResponsibilities: string;
  readonly notesURL: string;
}