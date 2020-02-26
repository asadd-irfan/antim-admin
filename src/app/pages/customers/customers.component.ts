import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';
import { GetAllCustomers, AddNotification, DeleteCustomer } from '../../store/actions/admin.actions';
import { environment } from './../../../environments/environment';

let Allcustomers: any[] = [];
let AllRequests: any[] = [];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  BaseUrl = environment.URLForDownloadFiles;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  // displayedColumns: string[] = ['name', 'email', 'phone', 'iqama', 'status', 'actions'];
  displayedColumns: string[] = ['name', 'TotalReq', 'ApproveReq', 'RejectedReq', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();

  displayedColumnRequests: string[] = ['name', 'date', 'price', 'status'];
  dataSourceRequests = new MatTableDataSource<any>(AllRequests);
  customersData: any;
  userID: any;
  options: IndividualConfig;
  showUserMessage = false;
  showRequestMessage = false;
  showRequests = false;
  customerName: any;
  CustomerAllRequestsData: any;
  customerID: any;
  reason: any;
  CustomerRequestType = 'All Requests'
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
    },
  ];
  userStatus: any[] = [
    {
      type: 'InActive'
    },
    {
      type: 'Active'
    },
    {
      type: 'Suspend'
    }
  ];
  fromDate = null;
  toDate = null;
  disableReset = false;
  disableSearch = false;

  getState: Observable<any>;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
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
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCustomers() {
    return new Promise((resolve, reject) => {
      this.getState.subscribe((state) => {
        // console.log('customers in store:', state)
        if (state.AllCustomers.length == 0) {
          this.store.dispatch(new GetAllCustomers());
        }
        this.customersData = state.AllCustomers;
        if (state.AllCustomers.length > 0) {
          resolve();
        }
      });
    });
  }

  ngOnInit() {
    this.getAllCustomers().then(e => {
      if (this.customersData.length > 0) {
        this.showUserMessage = false;
        Allcustomers.length = 0;
        this.customersData.map(element => {
          let customer = Object.assign({}, element, {
            status: this.userStatus[element.status].type
          })
          Allcustomers.push(customer);
        });
        this.dataSource = new MatTableDataSource<any>(Allcustomers);
        this.dataSource.paginator = this.paginator;
      } else {
        this.dataSource = new MatTableDataSource<any>(null);
        this.showUserMessage = true;
      }
    });
    if (this.customersData && this.customersData.length == 0) {
      this.dataSource = new MatTableDataSource<any>();
      this.showUserMessage = true;
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

  openUserDetails(row) {
    this.userID = row.id;
    this.router.navigate(['customers', this.userID]);
  }

  Search(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.showUserMessage = true;
    } else {
      this.showUserMessage = false;
    }
  }

  openRequests(row) {
    let id = row.id;
    this.spinner.show();
    this.adminApiService.getCustomerRequestsByUserId(id).subscribe(res => {
      this.spinner.hide();
      console.log(res)
      if (res.message) {
        // this.showErrorToast('Error!!', res.message, 'error');
        this.dataSourceRequests = new MatTableDataSource<any>(null);
        this.showRequestMessage = true;
        this.showRequests = true;
      } else {
        this.CustomerAllRequestsData = res.result;
        AllRequests.length = 0;
        this.CustomerAllRequestsData.forEach(element => {
          AllRequests.push(element);
          element.date = moment(element.createdAt).format('LL');
          element.price = element.totalPaybackAmount + ' SAR';
          element.status = this.requestTypes[element.requestType].type;
        });
        this.dataSourceRequests = new MatTableDataSource<any>(AllRequests);
        console.log('AllRequests:', AllRequests);
        this.showRequestMessage = false;
        this.showRequests = true;
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showRequestMessage = true;
      this.showRequests = true;
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }


  openProductDetails(row) {
    localStorage.setItem('customer-page', 'go-to-customer-page');
    this.customerID = row.id;
    this.router.navigate(['customers-requests', this.customerID]);
  }
  goBack() {
    this.showRequests = false;
    this.showUserMessage = false;
    this.showRequestMessage = false;
  }

  onChange(deviceValue) {
    this.dataSourceRequests.filter = deviceValue;
    this.CustomerRequestType = deviceValue;
    if (deviceValue == 'All Requests') {
      this.dataSourceRequests.filter = '';
      this.CustomerRequestType = 'All Requests';
    }
    if (this.dataSourceRequests.filteredData.length > 0) {
      this.showRequestMessage = false;
    } else {
      this.showRequestMessage = true;
    }
  }
  SearchRequest(value) {
    this.dataSourceRequests.filter = value.trim().toLowerCase();
    if (this.dataSourceRequests.filteredData.length == 0) {
      this.showRequestMessage = true;
    } else {
      this.showRequestMessage = false;
    }
  }

  openPopUp(content, row) {
    this.reason = '';
    this.customerID = row.id;
    this.customerName = row.firstName;
    this.modalService.open(content, { centered: false });
  }
  deleteCustomer() {
    this.spinner.show();
    this.adminApiService.deleteUser({
      "UserId": this.customerID,
      "Reason": this.reason
    }).subscribe(res => {
      this.store.dispatch(new DeleteCustomer({ id: this.customerID }));
      this.spinner.hide();
      this.ngOnInit();
      this.modalService.dismissAll();
      this.showSuccessToast('OK!!', 'User  ' + this.customerName + '  has been deleted Successfully.', 'success');
      console.log(res);
      this.reason = '';
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });
  }
  selectFromDate(evt: any) {
    this.fromDate = new Date(evt.year, evt.month - 1, evt.day);
    this.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
    this.toDate = '';
  }
  selectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    if (this.fromDate && this.toDate) {
      this.disableSearch = true;
    }
  }

  downloadCustomerData() {
    this.spinner.show();
    this.adminApiService.getUserReports('customer', this.fromDate, this.toDate).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res.message == 'No User Found') {
        this.fromDate = '';
        this.toDate = '';
        this.disableSearch = false;
        this.showErrorToast('ERROR!!', res.message, 'error');
      } else {
        window.open(this.BaseUrl + res.result, "_blank")
        this.showSuccessToast('OK!!', res.message, 'success');
        this.fromDate = '';
        this.toDate = '';
        this.disableSearch = false;
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  }

}
