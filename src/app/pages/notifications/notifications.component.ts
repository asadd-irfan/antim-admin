import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, AdminState } from './../../store/app.states';
import { ReadNotification, AddNotification } from './../../store/actions/admin.actions';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;

  allNotifications: any;
  unReadNotifications: any;
  filterNotifications: any;
  adminNotifications: any = [];
  getNotifications: boolean;

  fromDate = null;
  toDate = null;
  disableReset = false;
  disableSearch = false;
  getState: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.adminNotifications);

  constructor(
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.getState = this.store.select(AdminState);
    this.getNotifications = true;
  }

  ngOnInit() {
    this.spinner.show();
    this.adminApiService.getNotifications().subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.allNotifications = res.result;
      if (res.result.length > 0) {
        this.getNotifications = true;
        this.adminNotifications.length = 0;
        this.allNotifications.forEach(element => {
          this.adminNotifications.push(element);
          element.date = moment(element.createdAt).format('LL');
          element.time = moment(element.createdAt).format('LT');
        });

        this.dataSource = new MatTableDataSource<any>(this.adminNotifications);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();

      } else {
        this.getNotifications = false;
        this.adminNotifications.length = 0;
        this.dataSource = new MatTableDataSource<any>(this.adminNotifications);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      }

    }, err => {
      this.spinner.hide();
      console.log(err);
    });

    this.adminApiService.getNotificationsCount().subscribe(res => {
      // console.log(res);
      if (res.result.unreadNotifications > 0) {
        this.store.dispatch(new AddNotification(res.result.unreadNotifications));
      }
    }, err => {
      console.log(err);
    });
  }

  selectFromDate(evt: any) {
    this.fromDate = new Date(evt.year, evt.month - 1, evt.day);
    this.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
    this.toDate = '';
    // this.disableSearch = true;
  }
  selectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    if (this.fromDate && this.toDate) {
      this.disableSearch = true;
    }
  }
  filterRequests() {
    this.spinner.show();
    this.adminApiService.filterByDateNotifications(this.fromDate, this.toDate).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res.message) {
        this.getNotifications = false;
        this.disableReset = true;
        this.disableSearch = false;
        this.adminNotifications.length = 0;
        this.dataSource = new MatTableDataSource<any>(this.adminNotifications);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();

      } else {
        this.filterNotifications = res.result;
        this.allNotifications = null;
        this.allNotifications = this.filterNotifications;
        this.getNotifications = true;
        this.disableReset = true;
        this.disableSearch = false;
        this.adminNotifications.length = 0;
        this.allNotifications.forEach(element => {
          this.adminNotifications.push(element);
          element.date = moment(element.createdAt).format('LL');
        });

        this.dataSource = new MatTableDataSource<any>(this.adminNotifications);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();

      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  resetPage() {
    this.ngOnInit();
    this.fromDate = '';
    this.toDate = '';
    this.disableSearch = false;
    this.disableReset = false;
  }
  markAsReadNotification(id: any) {
    this.adminApiService.readNotification(id).subscribe(res => {
      this.ngOnInit();
      console.log(res);
      this.store.dispatch(new ReadNotification(1));
    }, err => {
      console.log(err);
    });
  }

}
