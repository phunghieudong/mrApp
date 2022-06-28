export type MedicalRecordStoryData = {
  Active: boolean;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  Description: string;
  Id: number;
  MedicalRecordId: number;
  RowNumber: number;
  SurgeryPart: string | null;
  SurgeryPlace: string | null;
  SurgeryResult: string | null;
  SurgeryYear: string | null;
  SympToms: string | null;
  Type: number;
  Updated: Date | null;
  UpdatedBy: string | null;
  UserEmail: string;
  UserFullName: string;
  UserId: number;
  UserPhone: string;
};

export type AddSurgeryMedicalStoryData = {
  department: string;
  year: string;
  place: string;
  result: string;
  complication: string;
};
