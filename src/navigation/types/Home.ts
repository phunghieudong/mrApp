import {
  ConfigTimeExaminationBySessionData,
  DoctorData,
} from "@/types/ExaminationForm";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeParamList = {
  // nơi khai báo screen và params
  Dashboard: undefined;
  CreateNewPassword: undefined;
  SpecialSchedule: {
    hospitalId?: number;
    hospitalName?: string;
    hospitalAddress?: string;
    hospitalWebsite?: string;
    hospitalPhoneNumber?: string;
    doctorId?: number;
    doctorName?: string;
    roomExaminationId?: number;
    roomExaminationName?: string;
    examinationDate?: Date;
    examinationScheduleDetailId?: number;
    examinationScheduleDetailName?: string;
  };
  NormalSchedule: {
    hospitalId?: number;
    hospitalName?: string;
    hospitalAddress?: string;
    hospitalWebsite?: string;
    hospitalPhoneNumber?: string;
    examinationDate?: Date;
    examinationScheduleDetailId?: number;
    examinationScheduleDetailName?: string;
    roomExaminationId?: number;
    roomExaminationName?: string;
  };
  Calendar: {
    hospitalId: number;
    doctorId?: number;
    specialistTypeId?: number;
    examinationDate?: Date;
    typeId: number;
  };
  HospitalPicker: { hospitalId?: number; typeId: number };
  DoctorPicker: {
    hospitalId: number;
    specialistTypeId: number;
    doctorId?: number;
    data: DoctorData[];
  };
  ChooseARoom: {
    typeId: number;
    hospitalId: number;
    specialistTypeId?: number;
    doctorId?: number;
    examinationDate: Date;
    examinationScheduleDetailId?: number;
  };
  TimePicker: {
    specialistTypeId?: number;
    examinationDate?: Date;
    examinationScheduleDetailId?: number;
    doctorId?: number;
    hospitalId?: number;
    typeId: number;
  };
  CheckSchedule: {
    doctorId?: number;
    doctorName?: string;
    examinationDate: Date;
    examinationScheduleDetailId: number;
    examinationScheduleDetailName: string;
    hospitalId: number;
    hospitalName: string;
    hospitalAddress: string;
    hospitalWebsite: string;
    hospitalPhoneNumber: string;
    isBHYT: number;
    roomExaminationId: number;
    roomExaminationName: string;
    specialistTypeId?: number;
    specialistTypeName?: string;
    status: number;
    typeId: number;
    recordId: number;
    serviceTypeId: number;
    serviceTypeName: string;
    vaccineTypeId?: number;
    vaccineTypeName?: string;
    examinationFormId?: number; // tồn tại field này thì không cần tạo thêm phiếu
    form?: number; // tồn tại field này thì không cần tạo thêm phiếu
  };
  ExaminationCalendar: undefined;
  Payment: {
    doctorId?: number;
    doctorName?: string;
    examinationDate: Date;
    examinationScheduleDetailId: number;
    examinationScheduleDetailName: string;
    hospitalId: number;
    hospitalName: string;
    hospitalAddress: string;
    hospitalWebsite: string;
    hospitalPhoneNumber: string;
    isBHYT: number;
    roomExaminationId: number;
    roomExaminationName: string;
    specialistTypeId?: number;
    specialistTypeName?: string;
    typeId: number;
    status: number;
    recordId: number;
    serviceTypeId: number;
    serviceTypeName: string;
    examinationFormId: number;
    vaccineTypeId?: number;
    vaccineTypeName?: string;
    form: number; // 0 là từ trang xác nhận thông tin sang, 1 là từ trang lịch hẹn sắp tới sang
  };
  CalendarInfo: {
    doctorId?: number;
    doctorName?: string;
    examinationDate: Date;
    examinationScheduleDetailId: number;
    examinationScheduleDetailName: string;
    hospitalId: number;
    hospitalName: string;
    hospitalAddress: string;
    hospitalWebsite: string;
    hospitalPhoneNumber: string;
    isBHYT: number;
    roomExaminationId: number;
    roomExaminationName: string;
    specialistTypeId?: number;
    specialistTypeName?: string;
    typeId: number;
    status: number;
    recordId: number;
    serviceTypeId: number;
    serviceTypeName: string;
    vaccineTypeId?: number;
    vaccineTypeName?: string;
    examinationFormId: number;
  };
};

// nơi khai báo props
// ++ dashboard
type DashboardScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "Dashboard"
>;
type DashboardScreenRouteProp = RouteProp<HomeParamList, "Dashboard">;
export type DashboardProps = {
  navigation: DashboardScreenNavigationProp;
  route: DashboardScreenRouteProp;
};

// ++ create new password
type CreateNewPasswordScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "CreateNewPassword"
>;
type CreateNewPasswordScreenRouteProp = RouteProp<
  HomeParamList,
  "CreateNewPassword"
>;
export type CreateNewPasswordProps = {
  navigation: CreateNewPasswordScreenNavigationProp;
  route: CreateNewPasswordScreenRouteProp;
};

// ++ special schedule
type SpecialScheduleScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "SpecialSchedule"
>;
type SpecialScheduleScreenRouteProp = RouteProp<
  HomeParamList,
  "SpecialSchedule"
>;
export type SpecialScheduleProps = {
  navigation: SpecialScheduleScreenNavigationProp;
  route: SpecialScheduleScreenRouteProp;
};

// ++ normal schedule
type NormalScheduleScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "NormalSchedule"
>;
type NormalScheduleScreenRouteProp = RouteProp<HomeParamList, "NormalSchedule">;
export type NormalScheduleProps = {
  navigation: NormalScheduleScreenNavigationProp;
  route: NormalScheduleScreenRouteProp;
};

// ++ check schedule
type CheckScheduleScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "CheckSchedule"
>;
type CheckScheduleScreenRouteProp = RouteProp<HomeParamList, "CheckSchedule">;
export type CheckScheduleProps = {
  navigation: CheckScheduleScreenNavigationProp;
  route: CheckScheduleScreenRouteProp;
};

// ++ hospital picker
type HospitalPickerScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "HospitalPicker"
>;
type HospitalPickerScreenRouteProp = RouteProp<HomeParamList, "HospitalPicker">;
export type HospitalPickerProps = {
  navigation: HospitalPickerScreenNavigationProp;
  route: HospitalPickerScreenRouteProp;
};

// ++ doctor picker
type DoctorPickerScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "DoctorPicker"
>;
type DoctorPickerScreenRouteProp = RouteProp<HomeParamList, "DoctorPicker">;
export type DoctorPickerProps = {
  navigation: DoctorPickerScreenNavigationProp;
  route: DoctorPickerScreenRouteProp;
};

// ++ choose a room
type ChooseARoomScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "ChooseARoom"
>;
type ChooseARoomScreenRouteProp = RouteProp<HomeParamList, "ChooseARoom">;
export type ChooseARoomProps = {
  navigation: ChooseARoomScreenNavigationProp;
  route: ChooseARoomScreenRouteProp;
};

// ++ time picker
type TimePickerScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "TimePicker"
>;
type TimePickerScreenRouteProp = RouteProp<HomeParamList, "TimePicker">;
export type TimePickerProps = {
  navigation: TimePickerScreenNavigationProp;
  route: TimePickerScreenRouteProp;
};

// ++ calendar
type CalendarScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "Calendar"
>;
type CalendarScreenRouteProp = RouteProp<HomeParamList, "Calendar">;
export type CalendarProps = {
  navigation: CalendarScreenNavigationProp;
  route: CalendarScreenRouteProp;
};

// ++ examination calendar
type ExaminationCalendarScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "ExaminationCalendar"
>;
type ExaminationCalendarScreenRouteProp = RouteProp<
  HomeParamList,
  "ExaminationCalendar"
>;
export type ExaminationCalendarProps = {
  navigation: ExaminationCalendarScreenNavigationProp;
  route: ExaminationCalendarScreenRouteProp;
};

// ++ payment
type PaymentScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "Payment"
>;
type PaymentScreenRouteProp = RouteProp<HomeParamList, "Payment">;
export type PaymentProps = {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
};

// ++ calendar info
type CalendarInfoScreenNavigationProp = StackNavigationProp<
  HomeParamList,
  "CalendarInfo"
>;
type CalendarInfoScreenRouteProp = RouteProp<HomeParamList, "CalendarInfo">;
export type CalendarInfoProps = {
  navigation: CalendarInfoScreenNavigationProp;
  route: CalendarInfoScreenRouteProp;
};
