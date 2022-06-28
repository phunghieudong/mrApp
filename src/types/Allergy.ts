export type AddAllergyData = {
  description: string;
  allergyTypeId: number;
  allergyTypeName: string;
  fromDate: Date;
  toDate: Date;
};

export type AllergyNoteData = {
  FromDate: Date | null;
  ToDate: Date | null;
  AllergyTypeId: number;
  UserId: number;
  Description: string;
  AllergyTypeName: string;
  UserFullName: string;
  RowNumber: number;
  Id: number;
  Created: Date;
  CreatedBy: string;
  Updated: Date | null;
  UpdatedBy: string | null;
  Deleted: boolean;
  Active: boolean;
};
