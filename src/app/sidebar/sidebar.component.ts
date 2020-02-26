import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from './../store/app.states';
import { SaveTotalNotifications, SaveTotalMessages } from './../store/actions/admin.actions';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const allROUTES: any[] = [
  { path: '/dashboard', title: 'Dashboard'},
  { path: '/customers', title: 'All Customers'},
  { path: '/customers-requests', title: 'All Customers Requests' },
  { path: '/funders', title: 'All Funders'},
  { path: '/funders-requests', title: 'All Funders Requests' },
  { path: '/notifications', title: 'Notifications' },
  { path: '/messages', title: 'Contact-Us Messages' },
  { path: '/static-pages', title: 'Edit Static Pages' },
  { path: '/subscribers', title: 'Subscribers Lists' },
  { path: '/settings', title: 'Portal Settings' },
];
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
  { path: '/customers', title: 'Customers ', icon: 'nc-single-02', class: '' },
  { path: '/customers-requests', title: 'Customer Requests', icon: 'nc-bullet-list-67', class: '' },
  { path: '/funders', title: 'Funders', icon: 'nc-single-02', class: '' },
  { path: '/funders-requests', title: 'Funder Requests', icon: 'nc-bullet-list-67', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '' },
  // { path: '/messages', title: 'Contact-us Messages', icon: 'nc-email-85', class: '' },
  { path: '/static-pages', title: 'Static Pages', icon: 'nc-single-copy-04', class: '' },
  { path: '/subscribers', title: 'Subscribers Lists', icon: 'nc-single-02', class: '' },
  // { path: '/payments', title: 'Payments', icon: 'nc-money-coins'  , class: '' },
];


@Component({
  moduleId: module.id,
  // tslint:disable-next-line: component-selector
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  adminData: any;
  getState: Observable<any>;
  notificationsCount: any;
  messagesCount: any;
  showCount = false;
  showMessagesCount = false;

  constructor(
    private router: Router,
    private adminService: AdminAPIsService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(AdminState);

  }
  ngOnInit() {
    this.getState.subscribe((state) => {
      // console.log( 'state:' , state);
      if (state.totalUnReadNotifications == 0) {
        this.showCount = false;
      }
      if (state.totalUnReadMessages == 0) {
        this.showMessagesCount = false;
      }
      this.notificationsCount = state.totalUnReadNotifications;
      this.messagesCount = state.totalUnReadMessages;
    });

    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.adminService.getContactMessagesCount().subscribe(res => {
      console.log(res)
      this.messagesCount = res.result.unreadContactMessages;
      if (this.messagesCount == 0) {
        this.showMessagesCount = false;
      } else {
        this.store.dispatch(new SaveTotalMessages(this.messagesCount));
        this.showMessagesCount = true;
      }
    }, err => {
      console.log(err);
    });
    this.adminService.getNotificationsCount().subscribe(res => {
      // console.log(res);
      this.notificationsCount = res.result.unreadNotifications;
      if (this.notificationsCount == 0) {
        this.showCount = false;
      } else {
        this.store.dispatch(new SaveTotalNotifications(this.notificationsCount));
        this.showCount = true;
      }
    }, err => {
      console.log(err);
    });
  }
  logout() {
    localStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigateByUrl('/login');
  }
}
