// react hook form
export type SpecialScheduleData = {
  hospitalName?: string;
  hospitalAddress?: string;
  hospitalWebsite?: string;
  hospitalPhoneNumber?: string;
  hospitalId?: number;
  doctorId?: number;
  doctorName?: string;
  roomExaminationId?: number;
  roomExaminationName?: string;
  specialistTypeId?: number;
  specialistTypeName?: string;
  examinationDate?: Date;
  examinationScheduleDetailId?: number;
  examinationScheduleDetailName?: string;
  serviceTypeId: number;
  serviceTypeName: string;
  typeId: number;
  isBHYT: number;
  recordId: number;
};

export type NormalScheduleData = {
  hospitalName?: string;
  hospitalAddress?: string;
  hospitalWebsite?: string;
  hospitalPhoneNumber?: string;
  hospitalId?: number;
  serviceTypeId?: number;
  serviceTypeName?: string;
  specialistTypeId?: number;
  specialistTypeName?: string;
  examinationDate?: Date;
  examinationScheduleDetailId?: number;
  examinationScheduleDetailName?: string;
  roomExaminationId?: number;
  roomExaminationName?: string;
  vaccineTypeId?: number;
  vaccineTypeName?: string;
  typeId: number;
  isBHYT?: number;
  isBHYTService?: boolean;
  recordId: number;
};

// examination schedule data
export type ConfigTimeExaminationDayOfWeekData = {
  ConfigTimeExaminationId: number;
  ConfigTimeExaminationValue: string;
  DayOfWeekName: string;
  ExaminationDate: Date;
  ExaminationScheduleDetailId: number;
  IsMaximum: false;
  MaximumExamination: any; // chưa biết
  RoomExaminationId: number;
  RoomName: string;
  SessionTypeCode: string;
  SessionTypeName: string;
};

export type ConfigTimeExaminationBySessionData = {
  ConfigTimeExaminationDayOfWeeks: Array<ConfigTimeExaminationDayOfWeekData;
  RoomExaminationId: number;
  RoomExaminationName: string;
  SessionTypeCode: string;
  SessionTypeName: string;
};

export type ExaminationScheduleData = {
  Active: boolean;
  ConfigTimeExaminationBySessions: Array<ConfigTimeExaminationBySessionData>;
  Created: Date;
  CreatedBy: string | null;
  DegreeTypeName: string;
  Deleted: boolean;
  DoctorCode: string | null;
  DoctorGender: string;
  DoctorGenderName: string;
  DoctorId: number;
  DoctorName: string;
  ExaminationDate: Date;
  ExaminationScheduleDetails: Array<any>; // chưa biết
  HospitalId: number;
  HospitalName: string | null;
  Id: number;
  IsMaximumAfternoon: boolean;
  IsMaximumMorning: boolean;
  IsMaximumOther: boolean;
  MaximumAfternoonExamination: number;
  MaximumMorningExamination: number;
  MaximumOtherExamination: number;
  Price: number;
  PriceDisplay: string;
  RowNumber: number;
  SpecialistTypeId: number;
  SpecialistTypeName: string;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// doctor data
export type DoctorData = {
  Active: boolean;
  ConfigTimeExaminationDayOfWeeks: Array<ConfigTimeExaminationDayOfWeekData>;
  Created: Date;
  CreatedBy: string | null;
  DateExaminations: Array<Date>;
  DayOfWeekDisplays: Array<{ DayOfWeekName: string; SessionTypeName: string }>;
  DegreeTypeName: string;
  Deleted: boolean;
  DoctorGender: number;
  DoctorGenderName: string;
  DoctorId: number;
  DoctorName: string;
  Id: number;
  Price: number;
  RowNumber: number;
  SpecialistTypeId: number;
  SpecialistTypeName: string;
  Updated: Date | null;
  UpdatedBy: string | null;
};

export type NewExaminationSchedule = {
  Active: boolean;
  ConfigTimeExaminationId: number;
  DayOfWeekName: string;
  ExaminationDay: Date;
  SessionTypeName: string;
  Created: Date;
  CreatedBy: string | null;
  DegreeTypeName: any; // chưa biết
  Deleted: boolean;
  DoctorCode: any; // chưa biết;
  DoctorGender: string;
  DoctorGenderName: string; // chưa biết
  DoctorId: number;
  DoctorName: string;
  ExaminationDate: Date;
  ExaminationScheduleDetails: Array<any>; // chưa biết
  HospitalId: number;
  HospitalName: string | null;
  Id: number;
  Price: number;
  PriceDisplay: string;
  RowNumber: number;
  SpecialistTypeId: number;
  SpecialistTypeName: string;
  Updated: Date | null;
  UpdatedBy: string | null;
};

type ExaminationScheduleDetail = {
  Active: boolean;
  ConfigTimeExaminationId: number;
  ConfigTimeExaminationValue: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  DoctorCode: any; // chưa biết
  DoctorDisplayName: string;
  DoctorId: number;
  ExaminationDate: Date | null;
  ExaminationDateDisplay: string;
  Id: number;
  MaximumExamination: number;
  RoomExaminationId: number;
  RoomExaminationName: string;
  RowNumber: number;
  ScheduleId: number;
  SpecialistTypeId: number | null;
  SpecialistTypeName: string;
  Updated: Date | null;
  UpdatedBy: string | null;
};

export type TimeScheduleData = {
  Active: boolean;
  ConfigExaminationTimes: any; // chưa biết
  ConfigTimeExaminationDayOfWeeks: any; // chưa biết
  Created: Date;
  CreatedBy: string | null;
  DegreeTypeName: string | null;
  Deleted: boolean;
  DoctorCode: any; // chưa biết
  DoctorGender: number;
  DoctorGenderName: string;
  DoctorId: number;
  DoctorName: string;
  ExaminationDate: Date;
  ExaminationScheduleDetails: Array<ExaminationScheduleDetail>;
  HospitalId: number;
  HospitalName: string | null;
  Id: number;
  Price: number | null;
  RowNumber: number;
  SpecialistTypeId: number;
  SpecialistTypeName: string;
  Updated: Date | null;
  UpdatedBy: string | null;
};

export type ScheduleSubmitData = {
  hospitalId: number;
  code: string;
  recordId: number;
  typeId: number;
  examinationDate: Date;
  reExaminationDate: any; // chưa biết
  specialistTypeId: number;
  doctorId: number;
  isBHYT: boolean;
  roomExaminationId: number;
  serviceTypeId: number;
  examinationScheduleDetailId: number;
  status: number;
  paymentMethodId: null;
  price: number;
  examinationIndex: string;
  note: string;
  feeExamination: number;
  bankInfoId: null;
  comment: string;
};

export type FeeData = {
  ExaminationFee: number;
  ExaminationFeeDisplay: string;
  ExaminationPrice: number;
  ExaminationPriceDisplay: string;
  TotalPayment: number;
  TotalPaymentDisplay: string;
};

export type LastestExaminationData = {
  Active: boolean;
  BHYTType: any; // chưa biết
  BankInfoId: any; // chưa biết
  BloodPressure: any; // chưa biết
  BloodSugar: any; // chưa biết
  ClientId: number;
  ClientName: string;
  Code: string | null;
  Comment: string | null;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  DoctorDisplayName: string | null;
  DoctorId: number | null;
  ExaminationDate: Date;
  ExaminationFormDetails: any; // chưa biết
  ExaminationHistories: Array<any>; // chưa biết
  ExaminationIndex: string;
  ExaminationScheduleDetail: ExaminationScheduleDetail;
  ExaminationScheduleDetailId: number;
  FeeExamination: any; // chưa biết
  HeartBeat: any; // chưa biết
  HospitalAddress: string;
  HospitalFiles: any; // chưa biết
  HospitalId: number;
  HospitalName: string;
  Id: number;
  IsBHYT: boolean;
  IsReExamination: boolean;
  MedicalRecordCode: string;
  Note: string;
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
  TypeId: number;
  Updated: Date | null;
  UpdatedBy: string | null;
  VaccineTypeId: number | null;
  VaccineTypeName: string | null;
};
