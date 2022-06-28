// country
export type CountryData = {
  Active: boolean;
  Code: string | null;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// city
export type CityData = {
  Active: boolean;
  Code: string | null;
  CountryId: number;
  CountryName: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// district
export type DistrictData = {
  Active: boolean;
  Code: string | null;
  CityId: number;
  CityName: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// ward
export type WardData = {
  Active: boolean;
  Code: string | null;
  CityId: number;
  CityName: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  DistrictId: number;
  DistrictName: string;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// nation
export type NationData = {
  CountryId: number;
  Code: string | null;
  Name: string;
  Description: string | null;
  RowNumber: number;
  Id: number;
  Created: Date;
  CreatedBy: string | null;
  Updated: Date | null;
  UpdatedBy: string | null;
  Deleted: boolean;
  Active: boolean;
};

// job
export type JobData = {
  Active: boolean;
  Code: string | null;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// hospital
export type HospitalData = {
  Active: boolean;
  Address: string;
  BankInfos: Array<any>; // chưa biết
  CallPortDescription: string;
  ChannelMappingHospitals: Array<any>; // chưa biết
  Code: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Email: string;
  ExpertFullName: string;
  ExpertPhone: string;
  HospitalFiles: Array<any>; // chưa biết
  Id: number;
  IsHasCallPort: boolean;
  IsHasItExpert: boolean;
  IsProvideInformation: boolean;
  MinutePerPatient: number;
  Name: string;
  NoCallPortDescription: string;
  Phone: string;
  ProvideDate: string;
  RowNumber: number;
  ServiceTypeMappingHospitals: Array<any>;
  Slogan: string | null;
  TickEndReceiveExamination: any; // chưa biết
  TickEndReceiveExaminationValue: any; // chưa biết
  Updated: Date | null;
  UpdatedBy: string | null;
  WebSiteUrl: string;
};

// service
export type ServiceData = {
  Active: boolean;
  Code: string;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  Description: string | null;
  Id: number;
  IsBHYT: boolean;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// special type data
export type SpecialTypeData = {
  Active: boolean;
  Code: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  HospitalId: number;
  HospitalName: string;
  Id: number;
  Name: string;
  Price: number;
  RowNumber: number;
  TotalDoctors: number;
  TotalExaminationForms: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

// degree data
export type DegreeData = {
  Active: boolean;
  Code: string;
  Created: Date;
  CreatedBy: string | null;
  Deleted: boolean;
  Description: string | null;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};

export type VaccineData = {
  Active: boolean;
  Code: string;
  Created: Date;
  CreatedBy: string;
  Deleted: false;
  Description: string | null;
  HospitalId: number;
  HospitalName: null;
  Id: number;
  Index: number;
  Name: string;
  Price: number;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: Date | null;
};

export type AllergyData = {
  Active: boolean;
  Code: string;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  Description: string;
  Id: number;
  Name: string;
  RowNumber: number;
  Updated: Date | null;
  UpdatedBy: string | null;
};
