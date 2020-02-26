import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material';

let InstallmentDetails: any[] = [];

@Component({
  selector: 'app-funder-request-details',
  templateUrl: './funder-request-details.component.html',
  styleUrls: ['./funder-request-details.component.scss']
})
export class FunderRequestDetailsComponent implements OnInit, OnDestroy {

  PaymentDetails: any = [];
  paymentLogsData: any;

  showRequestDetailsTable = false;
  displayedColumns: string[] = ['months', 'dueDate', 'price', 'status'];
  dataSource = new MatTableDataSource<any>(InstallmentDetails);
  monthlyInstallmentsData: any;
  savebutton = false;
  hideStatusForm = false;
  showTable = false;
  productStatus: any;

  requestID: any;
  reqProfitPrice: number;
  customerRequestID: any;
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
      type: 'Ongoing Requests'
    },
    {
      type: 'Closed Requests'
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
  status: any;
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

  installmentPeriod: any;
  antimProfit: number;
  funderProfit: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,

  ) {
    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('id');
    });
  }
  getFunderRequestDetails() {
    this.spinner.show();
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.spinner.show();
      this.adminApiService.GetFunderRequestDetails(this.requestID).subscribe(res => {
        console.log(res);
        this.requestDetails = res.result;
        this.productList = res.result.customerRequestProducts.slice();
        this.requestDate = moment(res.result.startingDate).format('LL');
        this.installmentPeriod = this.installmentMonths[res.result.paybackPeriod].type;
        this.requestType = this.requestTypes[res.result.requestType].type;
        this.showRequestDetailsTable = true;
        this.status = this.ProductStatus[res.result.productStatus].type;
        this.customerRequestID = res.result.customerRequestId;
        let totalProfit;
        if (res.result.fundedAmount > 5000) {
          totalProfit = (res.result.fundedAmount * 15) / 100;
        } else {
          totalProfit = (res.result.fundedAmount * 25) / 100;
        }
        this.reqProfitPrice = res.result.fundedAmount + totalProfit;
        this.antimProfit = Math.round((totalProfit * 20) / 100);
        this.funderProfit = Math.round((totalProfit * 80) / 100);
        localStorage.setItem('funderRequestType', this.requestType);
        this.spinner.hide();
        resolve(res);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    });
  }

  ngOnInit() {
    this.getFunderRequestDetails().then(e => {
      if (this.requestDetails.productStatus == 3) {
        this.showTable = true;
        this.spinner.show();
        this.adminApiService.getRequestInstallmentDetails(this.customerRequestID).subscribe(res => {
          console.log(res);
          this.monthlyInstallmentsData = res.result.customerInstallments;
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

          this.paymentLogsData = res.result.requestPayLogs;
          this.PaymentDetails.length = 0;
          this.paymentLogsData.forEach(element => {
            this.PaymentDetails.push(element);
            element.date = moment(element.createdAt).format('ll');
            element.time = moment(element.createdAt).format('LT');
            element.paymentType = this.PaymentTypes[element.paymentType].type;
          });
          console.log('PaymentDetails:', this.PaymentDetails);
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } else {
        this.showTable = false;
      }
    });
  }
  goBack() {
    let backPage = localStorage.getItem('funder-page');
    if (backPage == 'go-to-funder-page') {
      this.router.navigate(['/funders']);
    } else {
      this.router.navigate(['/funders-requests']);
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('funder-page');
  }


}
