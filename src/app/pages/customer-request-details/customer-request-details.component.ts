
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { ChangeCustomerRequestType, RemoveDashboardData } from 'app/store/actions/admin.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';

let InstallmentDetails: any[] = [];
let productstatus: any;
@Component({
  selector: 'app-customer-request-details',
  templateUrl: './customer-request-details.component.html',
  styleUrls: ['./customer-request-details.component.scss']
})
export class CustomerRequestDetailsComponent implements OnInit, OnDestroy {

  PaymentDetails: any = [];
  paymentLogsData: any;
  displayedColumns: string[] = ['months', 'dueDate', 'price', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(InstallmentDetails);
  monthlyInstallmentsData: any;
  savebutton = false;
  hideStatusForm = false;
  showTable = false;
  productStatus: any;

  requestID: any;
  requestDetails: any;
  requestDate: any;
  requestType: any;
  productList: any[] = [{
    productUrl: '',
    amount: null
  }];
  requestTypes: any[] = [
    {
      type: 'All Requests'
    },
    {
      type: 'Awaiting For Fund Requests'
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
  ProductStatus: any[] = [
    {
      type: 'Pending (Products Not Purchased Yet).'
    },
    {
      type: 'Products Purchased.'
    },
    {
      type: 'Products Delivered to Customer.'
    },
    {
      type: 'Products Recieved by Customer.'
    }
  ];
  amountStatus: any[] = [
    {
      type: 'Unpaid'
    },
    {
      type: 'Paid'
    },
  ];
  PaymentTypes: any[] = [
    {
      type: 'Null'
    },
    {
      type: 'Payment'
    },
    {
      type: 'NonPayment'
    },
  ];
  installmentMonths: any[] = [
    {
      type: 'Null'
    },
    {
      type: '3 Months'
    },
    {
      type: '6 Months'
    },
    {
      type: '9 Months'
    },
    {
      type: '12 Months'
    }
  ];
  status: any;
  installmentPeriod: any;
  showApproveRejectButtons = false;
  showRequestDetailsTable = false;
  options: IndividualConfig;
  rejectedReason = '';
  antimProfit: number;
  funderProfit: number;
  installmentID: any;
  customerID: any;
  customerRequestID: any;
  amount: any;
  isdeliveryFees: boolean;

  getState: Observable<any>;

  constructor(private route: ActivatedRoute,
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

    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('id');
    });
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  getCustomerRequestDetails() {
    this.spinner.show();
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.adminApiService.GetCustomerRequestDetails(this.requestID).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        this.requestDetails = res.result;
        if (res.result.productStatus == 3) {
          this.hideStatusForm = true;
        }
        this.isdeliveryFees = res.result.isDelieveryFees;
        this.productList = res.result.customerRequestProducts.slice();
        this.requestDate = moment(res.result.createdAt).format('LL');
        this.installmentPeriod = this.installmentMonths[res.result.paybackPeriod].type;
        this.requestType = this.requestTypes[res.result.requestType].type;
        if (res.result.requestType == 6) {
          this.showApproveRejectButtons = true;
        }
        if (res.result.requestType == 4 || res.result.requestType == 2) {
          this.showRequestDetailsTable = true;
        }
        this.status = this.ProductStatus[res.result.productStatus].type;
        let totalProfit = (res.result.totalPaybackAmount - res.result.totalFundAmount);
        this.antimProfit = Math.round((totalProfit * 20) / 100);
        this.funderProfit = Math.round((totalProfit * 80) / 100);
        localStorage.setItem('customerRequestType', this.requestType);
        resolve(res);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    });
  }
  ngOnInit() {
    this.getCustomerRequestDetails().then(e => {
      if (this.requestDetails.productStatus == 3) {
        this.getRequestInstallmentDetails();
      } else {
        this.showTable = false;
      }
    });
  }
  goBack() {
    let backPage = localStorage.getItem('customer-page');
    console.log(backPage)
    if (backPage == 'go-to-customer-page') {
      this.router.navigate(['/customers']);
    } else {
      this.router.navigate(['/customers-requests']);
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('customer-page');
  }
  getRequestInstallmentDetails() {
    this.spinner.show();
    this.adminApiService.getRequestInstallmentDetails(this.requestID).subscribe(res => {
      this.spinner.hide();
      this.showTable = true;
      console.log(res);
      this.monthlyInstallmentsData = res.result.customerInstallments;
      this.paymentLogsData = res.result.requestPayLogs;

      InstallmentDetails.length = 0;
      let i = 1;
      this.monthlyInstallmentsData.forEach(element => {
        InstallmentDetails.push(element);
        element.month = i;
        element.date = moment(element.dueDate).format('LL');
        element.price = element.amount + ' SAR';
        element.status = this.amountStatus[element.status].type;
        i++;
      });
      this.dataSource = new MatTableDataSource<any>(InstallmentDetails);
      console.log('InstallmentDetails:', InstallmentDetails);

      this.PaymentDetails.length = 0;
      this.paymentLogsData.forEach(element => {
        this.PaymentDetails.push(element);
        element.date = moment(element.createdAt).format('ll');
        element.time = moment(element.createdAt).format('LT');
        element.paymentType = this.PaymentTypes[element.paymentType].type;
      });
      console.log('PaymentDetails:', this.PaymentDetails);
    }, err => {
      console.log('error:', err);
      this.spinner.hide();
    });
  }
  OpenApprovePopup(content1) {
    this.modalService.open(content1, { centered: false });
  }
  OpenRejectPopup(content2) {
    this.modalService.open(content2, { centered: false });
  }

  rejectRequest() {
    this.spinner.show();
    this.adminApiService.changeRequestType({
      "Id": this.requestID,
      "requestType": 3,
      'rejectionReason': this.rejectedReason
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.store.dispatch(new ChangeCustomerRequestType({id: this.requestID, requestType: 3}));
      this.modalService.dismissAll();
      this.showSuccessToast('OK!!', 'The Request Type Has Been Changed From Under Review to Rejected', 'success');
      this.showApproveRejectButtons = false;
      this.requestType = 'Rejected Requests';
    }, err => {
      this.spinner.hide();
      this.modalService.dismissAll();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });
  }

  approveRequest() {
    this.spinner.show();
    this.adminApiService.changeRequestType({
      "Id": this.requestID,
      "requestType": 1
    }).subscribe(res => {
      this.spinner.hide();
      this.modalService.dismissAll();
      this.store.dispatch(new ChangeCustomerRequestType({id: this.requestID, requestType: 1}));
      console.log(res);
      this.showSuccessToast('OK!!', 'The Request Type Has Been Changed From Under Review  to Awaiting For Fund', 'success');
      this.showApproveRejectButtons = false;
      this.requestType = 'Awaiting For Fund Requests';
    }, err => {
      this.modalService.dismissAll();
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });
  }
  onChange(deviceValue) {
    this.savebutton = true;
    if (deviceValue === 'Purchased') {
      this.productStatus = 1;
      productstatus = 'Products Purchased.';
    }
    if (deviceValue === 'Delivered') {
      this.productStatus = 2;
      productstatus = 'Products Delivered to Customer.';
    }
    if (deviceValue === 'Recieved') {
      this.productStatus = 3;
      productstatus = 'Products Recieved by Customer.';
    }
  }
  changeStatus() {
    this.spinner.show();
    this.adminApiService.changeProductStatus({
      "CustomerRequestId": this.requestID,
      "Type": this.productStatus
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.store.dispatch(new RemoveDashboardData());
      if (res.message == 'Products are received by customer') {
        this.hideStatusForm = true;
        this.getRequestInstallmentDetails();
      }
      this.savebutton = false;
      this.showSuccessToast('OK!!', res.message, 'success');
      this.status = productstatus;
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });

  }
  OpenPayInstallmentPopUp(content3, row) {
    this.installmentID = row.id;
    this.customerID = row.customerId;
    this.customerRequestID = row.customerRequestId;
    this.amount = row.amount;
    this.modalService.open(content3, { centered: false });
  }

  payInstallment() {
    this.spinner.show();
    this.adminApiService.payInstallment({
      "Id": this.installmentID,
      "CustomerId": this.customerID,
      "RequestId": this.customerRequestID,
      "Amount": this.amount
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.store.dispatch(new RemoveDashboardData());
      this.getRequestInstallmentDetails();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.dismissAll();
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });

  }

}
