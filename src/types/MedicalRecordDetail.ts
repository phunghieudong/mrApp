import { UserFile } from "./User";

export type DiagnosticData = {
  Active: boolean;
  BarCodeUrl: string;
  BloodPressure: any; // chưa biết
  BloodSugar: any; // chưa biết
  Code: string;
  ConfigTimeValue: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  DiagnoticSickName: string;
  DiagnoticTypeId: number;
  DiagnoticTypeName: number;
  DoctorComment: string;
  DoctorDegreeTypeName: string;
  DoctorDislayName: string;
  DoctorName: string;
  ExaminationDate: Date;
  ExaminationFormId: number;
  ExaminationIndex: string;
  ExaminationPaymentIndex: string;
  ExaminationScheduleDetailId: number;
  HasMedicalBills: boolean;
  HeartBeat: any; // chưa biết
  HospitalAddress: string;
  HospitalId: number;
  HospitalName: string;
  HospitalPhone: string;
  HospitalWebSite: string;
  Id: number;
  MedicalBills: Array<any>; // chưa biết
  MedicalRecordCode: string;
  MedicalRecordId: number;
  PaymentMethodId: number;
  PaymentMethodName: number;
  Price: number;
  QrCodeUrlFile: string;
  ReExaminationDate: Date | null;
  RoomName: string;
  RowNumber: number;
  ServiceType: number | null;
  ServiceTypeName: string;
  SpecialistTypeId: number;
  SpecialistTypeName: string;
  TypeId: number;
  Updated: Date | null;
  UpdatedBy: string | null;
  UserFiles: Array<UserFile>;
};
