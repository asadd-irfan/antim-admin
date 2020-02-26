import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Url = environment.BaseURL;
  authState = new BehaviorSubject(null);
  User: Observable<any>;
  role: any;

  constructor(private httpClient: HttpClient) {
    this.loadUser();
    this.User = this.authState.asObservable();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authState.next(token);
    } else {
      this.authState.next(null);
    }
  }

  login(user: any): Observable<any> {
    const loginDetails = 'username=' + user.username + '&password=' + user.password + '&grant_type=password&role=admin' ;
    return this.httpClient.post(`${this.Url}login`, loginDetails).pipe(
      tap((res: any) => {
        this.authState.next(res.access_token);
        // console.log(res.access_token);
        localStorage.setItem('token', res.access_token);
        const decoded = jwt_decode(res.access_token);
        this.role = decoded.role;
        localStorage.setItem('role', this.role);
      }));
  }
  resetPassword(user: any): Observable<any> {
    return this.httpClient.patch(`${this.Url}Account/ResetPassword`, user).pipe(
      tap((res: any) => {
      })
    );
  }
  // FORGET PASSWORD
  sendEmailToUser(email: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/ForgotPassword`, email).pipe(
      tap((res: any) => {
        // console.log('In ForgotPassword api:', res);
      })
    );
  }
}
