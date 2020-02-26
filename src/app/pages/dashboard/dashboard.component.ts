import { Component, OnInit } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddNotification, GetDashboardData } from 'app/store/actions/admin.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  DashboardData: any;
  getState: Observable<any>;

  constructor(private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(AdminState);
  }

  GetDashboardData() {
    return new Promise((resolve, reject) => {
      this.getState.subscribe((state) => {
        // console.log('In DashboardData state : ', state);
        if (state.DashboardData == null) {
          this.store.dispatch(new GetDashboardData());
        }
        this.DashboardData = state.DashboardData;
        if (state.DashboardData != null) {
          resolve();
        }
      });
    });
  }

  ngOnInit() {
    this.GetDashboardData().then(e => {

      this.adminApiService.getNotificationsCount().subscribe(res => {
        // console.log(res);
        if (res.result.unreadNotifications > 0) {
          this.store.dispatch(new AddNotification(res.result.unreadNotifications));
          }
      }, err => {
        console.log(err);
      });
    });
  }
}
