export type NotificationData = {
  Active: boolean;
  AppUrl: string | null;
  Content: string | null;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  FromUserId: number | null;
  FromUserName: string | null;
  HospitalId: number | null;
  HospitalIds: any[]; // chưa biết
  HospitalName: string | null;
  Id: number;
  IsRead: boolean;
  IsSendNotify: boolean;
  NotificationTemplateId: number | null;
  NotificationTypeId: number | null;
  NotificationTypeName: string | null;
  RowNumber: number;
  Title: string | null;
  Updated: Date | null;
  UpdatedBy: string | null;
  UserGroupIds: any[]; // chưa biết
  UserIds: any[]; // chưa biết
  WebUrl: string | null;
};
