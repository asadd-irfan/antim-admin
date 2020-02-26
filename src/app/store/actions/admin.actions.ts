import { Action } from '@ngrx/store';

export enum AdminActionTypes {
  SAVE_TOTAL_NOTIFICATIONS = 'SaveTotalNotifications',
  READ_NOTIFICATION = 'ReadNotification',
  ADD_NOTIFICATION = 'AddNotification',

  SAVE_TOTAL_MESSAGES = 'SaveTotalMessages',
  READ_MESSAGE = 'ReadMessage',

  GET_ALL_CUSTOMERS = 'GetAllCustomers',
  SAVE_ALL_CUSTOMERS = 'SaveAllCustomers',
  CHANGE_CUSTOMER_STATUS = 'ChangeCustomerStatus',
  DELETE_CUSTOMER = 'DeleteCustomer',

  GET_CUSTOMER_REQUESTS = 'GetCustomerRequests',
  SAVE_CUSTOMER_REQUESTS = 'SaveCustomerRequests',
  CHANGE_CUSTOMER_REQUEST_TYPE = 'ChangeCustomerRequestType',

  GET_ALL_FUNDERS = 'GetAllFunders',
  SAVE_ALL_FUNDERS = 'SaveAllFunders',
  CHANGE_FUNDER_STATUS = 'ChangeFunderStatus',
  DELETE_FUNDER = 'DeleteFunder',

  GET_FUNDER_REQUESTS = 'GetFunderRequests',
  SAVE_FUNDER_REQUESTS = 'SaveFunderRequests',
  REMOVE_FUNDER_REQUESTS = 'RemoveFunderRequests',

  GET_DASHBOARD_DATA = 'GetDashboardData',
  SAVE_DASHBOARD_DATA = 'SaveDashboardData',
  REMOVE_DASHBOARD_DATA = 'RemoveDashboardData',


}

export class SaveTotalMessages implements Action {
  readonly type = AdminActionTypes.SAVE_TOTAL_MESSAGES;
  constructor(public payload: any) {}
}
export class ReadMessage implements Action {
  readonly type = AdminActionTypes.READ_MESSAGE;
  constructor(public payload: any) {}
}
export class SaveTotalNotifications implements Action {
  readonly type = AdminActionTypes.SAVE_TOTAL_NOTIFICATIONS;
  constructor(public payload: any) {}
}
export class ReadNotification implements Action {
  readonly type = AdminActionTypes.READ_NOTIFICATION;
  constructor(public payload: any) {}
}
export class AddNotification implements Action {
  readonly type = AdminActionTypes.ADD_NOTIFICATION;
  constructor(public payload: any) {}
}


export class GetAllFunders implements Action {
  readonly type = AdminActionTypes.GET_ALL_FUNDERS;
  constructor() { }
}
export class SaveAllFunders implements Action {
  readonly type = AdminActionTypes.SAVE_ALL_FUNDERS;
  constructor(public payload: any) { }
}
export class ChangeFunderStatus implements Action {
  readonly type = AdminActionTypes.CHANGE_FUNDER_STATUS;
  constructor(public payload: any) { }
}
export class DeleteFunder implements Action {
  readonly type = AdminActionTypes.DELETE_FUNDER;
  constructor(public payload: any) { }
}


export class GetFunderRequests implements Action {
  readonly type = AdminActionTypes.GET_FUNDER_REQUESTS;
  constructor() { }
}
export class SaveFunderRequests implements Action {
  readonly type = AdminActionTypes.SAVE_FUNDER_REQUESTS;
  constructor(public payload: any) { }
}
export class RemoveFunderRequests implements Action {
  readonly type = AdminActionTypes.REMOVE_FUNDER_REQUESTS;
  constructor() { }
}


export class GetAllCustomers implements Action {
  readonly type = AdminActionTypes.GET_ALL_CUSTOMERS;
  constructor() { }
}
export class SaveAllCustomers implements Action {
  readonly type = AdminActionTypes.SAVE_ALL_CUSTOMERS;
  constructor(public payload: any) { }
}
export class ChangeCustomerStatus implements Action {
  readonly type = AdminActionTypes.CHANGE_CUSTOMER_STATUS;
  constructor(public payload: any) { }
}
export class DeleteCustomer implements Action {
  readonly type = AdminActionTypes.DELETE_CUSTOMER;
  constructor(public payload: any) { }
}


export class GetCustomerRequests implements Action {
  readonly type = AdminActionTypes.GET_CUSTOMER_REQUESTS;
  constructor() { }
}
export class SaveCustomerRequests implements Action {
  readonly type = AdminActionTypes.SAVE_CUSTOMER_REQUESTS;
  constructor(public payload: any) { }
}
export class ChangeCustomerRequestType implements Action {
  readonly type = AdminActionTypes.CHANGE_CUSTOMER_REQUEST_TYPE;
  constructor(public payload: any) { }
}

export class GetDashboardData implements Action {
  readonly type = AdminActionTypes.GET_DASHBOARD_DATA
  constructor() { }
}
export class SaveDashboardData implements Action {
  readonly type = AdminActionTypes.SAVE_DASHBOARD_DATA;
  constructor(public payload: any) { }
}
export class RemoveDashboardData implements Action {
  readonly type = AdminActionTypes.REMOVE_DASHBOARD_DATA;
  constructor() { }
}


export type AdminActions =
  | GetAllCustomers
  | SaveAllCustomers
  | ChangeCustomerStatus
  | DeleteCustomer

  | GetCustomerRequests
  | SaveCustomerRequests
  | ChangeCustomerRequestType

  | GetAllFunders
  | SaveAllFunders
  | ChangeFunderStatus
  | DeleteFunder

  | GetFunderRequests
  | SaveFunderRequests
  | RemoveFunderRequests

  | GetDashboardData
  | SaveDashboardData
  | RemoveDashboardData

  | SaveTotalMessages
  | ReadMessage

  | SaveTotalNotifications
  | ReadNotification
  | AddNotification;
