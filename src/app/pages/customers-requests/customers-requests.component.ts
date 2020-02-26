import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';
import { GetCustomerRequests, AddNotification } from '../../store/actions/admin.actions';
import { environment } from './../../../environments/environment';


let AllCustomerRequests: any[] = [];

@Component({
  selector: 'app-customers-requests',
  templateUrl: './customers-requests.component.html',
  styleUrls: ['./customers-requests.component.scss']
})
export class CustomersRequestsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  BaseUrl = environment.URLForDownloadFiles;

  displayedColumns: string[] = ['reqName', 'reqNumber', 'customerName', 'date', 'price', 'status'];
  dataSource = new MatTableDataSource<any>(AllCustomerRequests);
  customerRequestsData: any;
  customerID: any;
  options: IndividualConfig;
  showMessage = false;
  requestType = 'All Requests'

  requestTypes: any[] = [
    {
      type: 'All Requests'
    },
    {
      type: 'Awaiting for Fund Requests'
    },
    {
      type: 'Closed Requests'
    },
    {
      type: 'Rejected Requests'
    },
    {
      type: 'Ongoing Requests'
    },
    {
      type: 'Draft Requests'
    },
    {
      type: 'Under Review Requests'
    }
  ];
  getState: Observable<any>;

  type: any;
  disableSearch = false;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(AdminState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  getCustomerRequests() {
    return new Promise((resolve, reject) => {
      this.getState.subscribe((state) => {
        // console.log('In customerRequest state : ', state);
        if (state.AllCustomerRequests.length == 0) {
          this.store.dispatch(new GetCustomerRequests());
        }
        this.customerRequestsData = state.AllCustomerRequests;
        if (state.AllCustomerRequests.length > 0) {
          resolve();
        }
      });
    });
  }

  ngOnInit() {
    let customerRequestType = localStorage.getItem('customerRequestType');
    let selectedRequestType = localStorage.getItem('selectedRequestType');

    this.getCustomerRequests().then(e => {
      if (this.customerRequestsData.length > 0) {
        this.showMessage = false;
        AllCustomerRequests.length = 0;
        this.customerRequestsData.forEach(element => {
          element.forEach(customer => {
            let updatedCustomerRequests = Object.assign({}, customer)
            updatedCustomerRequests.date = moment(customer.updatedAt).format('L');
            updatedCustomerRequests.price = customer.totalPaybackAmount + ' SAR';
            updatedCustomerRequests.status = this.requestTypes[customer.requestType].type;
            AllCustomerRequests.push(updatedCustomerRequests);
          });
        });
        this.dataSource = new MatTableDataSource<any>(AllCustomerRequests);
        console.log('AllCustomerRequests:', AllCustomerRequests);
        this.spinner.hide();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<any>(null);
        this.showMessage = true;
      }
      if (customerRequestType == selectedRequestType && selectedRequestType != null && customerRequestType != null) {
        this.requestType = customerRequestType;
        this.dataSource.filter = customerRequestType;
      } else {
        this.dataSource.filter = '';
      }
    });
    if (this.customerRequestsData.length == 0) {
      this.showMessage = true;
    }
    this.adminApiService.getNotificationsCount().subscribe(res => {
      // console.log(res);
      if (res.result.unreadNotifications > 0) {
        this.store.dispatch(new AddNotification(res.result.unreadNotifications));
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('customerRequestType');
  }
  openProductDetails(row) {
    this.customerID = row.id;
    this.router.navigate(['customers-requests', this.customerID]);
  }

  onChange(deviceValue) {
    this.dataSource.filter = deviceValue;
    this.requestType = deviceValue;
    this.disableSearch = true;
    localStorage.setItem('selectedRequestType', deviceValue);
    if (deviceValue == 'All Requests') {
      this.type = 0;
      this.dataSource.filter = '';
      this.requestType = 'All Requests';
    }
    if (deviceValue == 'Awaiting for Fund Requests') {
      this.type = 1;
    }
    if (deviceValue == 'Closed Requests') {
      this.type = 2;
    }
    if (deviceValue == 'Rejected Requests') {
      this.type = 3;
    }
    if (deviceValue == 'Ongoing Requests') {
      this.type = 4;
    }
    if (deviceValue == 'Under Review Requests') {
      this.type = 6;
    }
    if (this.dataSource.filteredData.length > 0) {
      this.showMessage = false;
    } else {
      this.showMessage = true;
    }
  }

  Search(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }

  downloadReports() {
    this.spinner.show();
    if (this.type == 0) {
      this.adminApiService.exportAllRequests().subscribe(res => {
        this.spinner.hide();
        console.log(res);
        window.location.assign(this.BaseUrl + res.result)
        this.showSuccessToast('OK!!', res.message, 'success');
        this.disableSearch = false;
      }, err => {
        console.log(err);
        this.spinner.hide();
        this.showErrorToast('ERROR!!', err.error.message, 'error');
      });
    } else {
      this.adminApiService.exportAllRequestsByType(this.type).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        window.location.assign(this.BaseUrl + res.result)
        this.showSuccessToast('OK!!', res.message, 'success');
        this.disableSearch = false;
      }, err => {
        console.log(err);
        this.spinner.hide();
        this.showErrorToast('ERROR!!', err.error.message, 'error');
      });

    }
  }

}
