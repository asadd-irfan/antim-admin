import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
// import { ResponseContentType, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIsService {
  Url = environment.BaseURL;
  token: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) { }

  getTokenAndHeaders() {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.token}`
      })
    };
  }

  // GET USER PERSONAL INFORMATION
  getAdminData(): Observable<any> {
    const Token = localStorage.getItem('token');
    // console.log('TOKEN', Token);
    const HttpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${Token}`
      })
    };
    return this.httpClient.get(`${this.Url}User/GetLoggedInUser`, HttpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  editUser(user: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/EditUser`, user, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  editUserPhoneNumber(editedMobileNo: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}User/EditUserPhoneNumber`, editedMobileNo, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  confirmNewPhoneNumber(OTPAndMobileNo: any) {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/ConfirmNewPhoneNumber`, OTPAndMobileNo, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  resendOtpForPhoneNumber(resendOTPDetails: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}User/ResendOtpForPhoneNumber`, resendOTPDetails, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  editEmail(body: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}User/EditUserEmail`, body, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  changePassword(passwordDetails: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Account/ChangePassword`, passwordDetails, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  confirmEmail(userId, code): Observable<any> {
    return this.httpClient.patch(`${this.Url}Account/ConfirmEmail?userId=${userId}&code=${code}`, null).pipe(
      tap((res: any) => {
      })
    );
  }
  ConfirmNewEmail(email, userId, code): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/ConfirmNewEmail?email=${email}&userId=${userId}&code=${code}`,
      null, this.httpOptions)
      .pipe(
        tap((res: any) => {
        })
      );
  }

  getAllUsers(role: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetAllUsersByRole?role=${role}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getUserDetails(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetUserDetailsById?userId=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getAllRequestsByUserRoles(role: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetAllRequestsByUserRoles?role=${role}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getCustomerRequestsByUserId(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetCustomerRequestsByUserId?userId=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getFunderRequestsByUserId(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetFunderRequestsByUserId?userId=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  GetCustomerRequestDetails(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetCustomerRequestDetails?id=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  GetFunderRequestDetails(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetFunderRequestDetails?id=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  GetAdminDashboard(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Admin/GetAdminDashboard`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  changeRequestType(IdAndType: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Admin/ChangeCustomerRequestType`, IdAndType, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  addOrUpdateUserBalance(balance: any) {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/AddOrUpdateUserBalance`, balance, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  activateUser(id: any) {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Admin/ActivateUser?id=${id}`, null, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getNotifications(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Notification/GetLoggedInUserNotifications`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  readNotification(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Notification/ReadNotificationById?id=${id}`, null, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getNotificationsCount(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Notification/GetUnreadUserNotificationsCount`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  filterByDateNotifications(fromDate, toDate): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Notification/GetFilteredNotifications?dateFrom=${fromDate}&dateTo=${toDate}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  deActivateUser(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Admin/DeactivateUserAccount`, id, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  suspendUser(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Admin/SuspendUserAccount`, id, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  deleteUser(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Admin/DeleteUserAccount`, id, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  changeProductStatus(data: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Transaction/ChangeProductsStatus`, data, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getRequestInstallmentDetails(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Transaction/GetRequestInstallments?requestId=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  payInstallment(body: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}Transaction/PayCustomerInstallments`, body, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  GetAllMessages(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}ContactUs/GetAllMessages`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  getContactMessagesCount(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}ContactUs/GetUnreadContactMessagesCount`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  readContactMessageById(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}ContactUs/ReadContactMessageById?id=${id}`, null, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  createNewAdmin(body: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}Admin/CreateNewAdmin`, body, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getUserReports(role: any, fromdate: any, todate: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Report/GetUsersReportByUserRole?role=${role}&dateFrom=${fromdate}&dateTo=${todate}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  exportAllRequests(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Report/ExportAllRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  exportAllRequestsByType(type: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Report/ExportAllRequests?type=${type}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  getConfigData() {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}ConfigData/GetConfigDataByKey?key=`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  editConfigData(data: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}ConfigData/EditConfigData`, data, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  addOrUpdateStaticPage(body: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}StaticPage/AddOrUpdateStaticPage`, body, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  getStaticPageByKey(pageKey: any) {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}StaticPage/GetStaticPageByKey?pageKey=${pageKey}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getSubscribersList() {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Subscription/GetSubscribersList`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  deleteSubscriber(email: any) {
    this.getTokenAndHeaders();
    return this.httpClient.delete(`${this.Url}Subscription/Unsubscribe?email=${email}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

}

