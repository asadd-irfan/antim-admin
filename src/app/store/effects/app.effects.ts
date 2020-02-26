import { Injectable } from '@angular/core';
import { Actions, createEffect,  Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { AdminActionTypes, SaveAllCustomers, SaveCustomerRequests, SaveFunderRequests, SaveAllFunders, SaveDashboardData} from '../actions/admin.actions';
@Injectable()
export class AppEffects {

  @Effect({ dispatch: false })
  GetDashboardData: Observable<any> = this.actions.pipe(
    ofType(AdminActionTypes.GET_DASHBOARD_DATA),
    tap(() => {
      this.spinner.show();
      return this.adminService.GetAdminDashboard().subscribe(res => {
        console.log(res);
        this.spinner.hide();
        // if (res.result) {
          this.store.dispatch(new SaveDashboardData(res.result));
        // }
        // if (res.message) {
        // }
      }, err => {
        this.spinner.hide();
        console.log('Error in GetDashboardData:', err);
      });
    }));


  @Effect({ dispatch: false })
  GetAllCustomers: Observable<any> = this.actions.pipe(
    ofType(AdminActionTypes.GET_ALL_CUSTOMERS),
    tap(() => {
      this.spinner.show();
      return this.adminService.getAllUsers('customer').subscribe(res => {
        console.log(res);
        this.spinner.hide();
        if (res.result) {
          this.store.dispatch(new SaveAllCustomers(res.result));
        }
        // if (res.message) {
        // }
      }, err => {
        this.spinner.hide();
        console.log('Error in GetAllCustomers:', err);
      });
    }));

    @Effect({ dispatch: false })
    GetCustomerRequests: Observable<any> = this.actions.pipe(
      ofType(AdminActionTypes.GET_CUSTOMER_REQUESTS),
      tap(() => {
        this.spinner.show();
        return this.adminService.getAllRequestsByUserRoles('customer').subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res.result) {
            this.store.dispatch(new SaveCustomerRequests(res.result));
          }
          // if (res.message) {
          // }
        }, err => {
          this.spinner.hide();
          console.log('Error in GetCustomerRequests:', err);
        });
      }));


  @Effect({ dispatch: false })
  GetAllFunders: Observable<any> = this.actions.pipe(
    ofType(AdminActionTypes.GET_ALL_FUNDERS),
    tap(() => {
      this.spinner.show();
      return this.adminService.getAllUsers('funder').subscribe(res => {
        console.log(res);
        this.spinner.hide();
        if (res.result) {
          this.store.dispatch(new SaveAllFunders(res.result));
        }
        // if (res.message) {
        // }
      }, err => {
        this.spinner.hide();
        console.log('Error in GetAllFunders:', err);
      });
    }));

    @Effect({ dispatch: false })
    GetFunderRequests: Observable<any> = this.actions.pipe(
      ofType(AdminActionTypes.GET_FUNDER_REQUESTS),
      tap(() => {
        this.spinner.show();
        return this.adminService.getAllRequestsByUserRoles('funder').subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res.result) {
            this.store.dispatch(new SaveFunderRequests(res.result));
          }
          // if (res.message) {
          // }
        }, err => {
          this.spinner.hide();
          console.log('Error in GetFunderRequests:', err);
        });
      }));


  constructor(
    private actions: Actions,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminAPIsService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
  ) {
  }

}
