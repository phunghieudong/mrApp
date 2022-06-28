type HospitalFile = {
  Active: boolean;
  ContentType: any; // chưa biết
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  FileExtension: string;
  FileName: string;
  FileRandomName: string | null;
  FileType: number;
  FileUrl: string;
  HospitalId: number;
  Id: number;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

export type CalendarData = {
  Active: boolean;
  BHYTType: any; // chưa biết
  BankInfoId: any; // chưa biết
  BloodPressure: any; // chưa biết
  BloodSugar: any; // chưa biết
  ClientId: number;
  ClientName: string;
  Code: any; // chưa biết
  Comment: string | null;
  ConfigTimeExaminationValue: string;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  DoctorDisplayName: string;
  DoctorId: number;
  ExaminationDate: Date;
  ExaminationFormDetails: any; // chưa biết
  ExaminationHistories: Array<any>; // chưa biết
  ExaminationIndex: string;
  ExaminationScheduleDetail: string | null;
  ExaminationScheduleDetailId: number;
  FeeExamination: number | null;
  HeartBeat: any; // chưa biết
  HospitalId: number;
  HospitalName: string;
  HospitalAddress: string;
  HospitalPhone: string;
  HospitalWebSite: string;
  HospitalFiles: Array<HospitalFile>;
  Id: number;
  IsBHYT: boolean;
  IsReExamination: boolean;
  MedicalRecordCode: string;
  NextInjectionDate: Date | null;
  NextInjectionDateDisplay: string | null;
  Note: string | null;
  NumberOfDoses: number | null;
  PaymentHistories: Array<any>; // chưa biết
  PaymentMethodId: number;
  Price: number;
  ReExaminationDate: Date | null;
  RecordId: number;
  RoomExaminationId: number;
  RoomExaminationName: string;
  RowNumber: number;
  ServiceTypeId: number;
  ServiceTypeName: string;
  SpecialistTypeId: number | null;
  SpecialistTypeName: string | null;
  Status: number;
  StatusName: string;
  TotalCurrentInjections: number | null;
  TotalRemainInject: number | null;
  TypeId: number;
  Updated: Date | null;
  UpdatedBy: string | null;
  VaccineTypeId: number | null;
  VaccineTypeName: string | null;
};
