export type FolderData = {
  Active: boolean;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  FolderIcon: null | string;
  FolderName: string;
  Id: number;
  RowNumber: number;
  TotalImageInFolder: number;
  TypeId: number;
  Updated: Date | null;
  UpdatedBy: string | null;
  UserFiles: any[]; // chưa biết
  UserId: number | null;
};

export type ImageFolderData = {
  Active: true;
  ContentType: string;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  Description: string | null;
  FileExtension: string;
  FileName: string;
  FileRandomName: string | null;
  FileType: number;
  FileUrl: string;
  FolderId: number;
  Id: number;
  MedicalRecordDetailId: number;
  MedicalRecordId: number;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
  UserId: number;
};
