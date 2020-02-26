import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCustomerStatus } from 'app/store/actions/admin.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  BaseUrl = environment.URLForDownloadFiles;

  customerId: any;
  customerAllDetails: any;
  customerStatus: any;
  customerAddress: any;
  customerCity: any;
  customerBankName: any;
  customerBankAccountNumber: any;
  customerBankAccountTitle: any;
  showActivateButton = false;
  options: IndividualConfig;
  showStatus = true;
  savebutton = false;
  reason: any;
  accountStatements: any;
  ShowAccountStatements: boolean;
  salaryStatements: any;
  ShowSalaryStatements: boolean;
  getState: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(AdminState);

    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
    });

  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }


  ngOnInit() {
    this.spinner.show();
    this.adminApiService.getUserDetails(this.customerId).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.customerAllDetails = res.result;
      if (res.result.userAddresses.length > 0) {
        this.customerAddress = res.result.userAddresses[0].address;
        this.customerCity = res.result.userAddresses[0].city;
      }
      if (res.result.userBanks.length > 0) {
        this.customerBankName = res.result.userBanks[0].bankName;
        this.customerBankAccountNumber = res.result.userBanks[0].accountNumber;
        this.customerBankAccountTitle = res.result.userBanks[0].accountTitle;
      }
      if (res.result.status == 0 || res.result.status == 2) {
        this.showActivateButton = true;
        this.showStatus = false;
      }
      if (res.result.status == 1) {
        this.showActivateButton = false;
        this.showStatus = true;
      }
      if (res.result.accountStatements && res.result.accountStatements.length == 0) {
        this.ShowAccountStatements = false;
        } else {
          this.ShowAccountStatements = true;
          this.accountStatements = res.result.accountStatements;
        }
        if (res.result.salaryStatements && res.result.salaryStatements.length == 0) {
          this.ShowSalaryStatements = false;
        } else {
          this.ShowSalaryStatements = true;
          this.salaryStatements = res.result.salaryStatements;
        }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  onChange(deviceValue) {
    this.savebutton = true;
    if (deviceValue === 'deActive') {
      this.customerStatus = 'DeActivate';
    }
    if (deviceValue === 'suspend') {
      this.customerStatus = 'Suspend';
    }
  }

  OpenPopup(content1) {
    this.modalService.open(content1, { centered: false });
  }
  OpenActivatePopup(content) {
    this.modalService.open(content, { centered: false });
  }

  activateUser() {
    this.spinner.show();
    this.adminApiService.activateUser(this.customerId).subscribe(res => {
      this.modalService.dismissAll();
      this.spinner.hide();
      console.log(res);
      this.showSuccessToast('OK!!', 'The User Has Been Activated Successfully.', 'success');
      this.store.dispatch(new ChangeCustomerStatus({id: this.customerId, status: 1}));
      this.showActivateButton = false;
      this.showStatus = true;
    }, err => {
      this.modalService.dismissAll();
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });
  }

  ChangeStatus() {
    if (this.customerStatus == 'DeActivate') {
      this.spinner.show();
      this.adminApiService.deActivateUser({
        "UserId": this.customerId,
        "Reason": this.reason
      }).subscribe(res => {
        this.modalService.dismissAll();
        this.spinner.hide();
        this.store.dispatch(new ChangeCustomerStatus({id: this.customerId, status: 0}));
        this.savebutton = false;
        console.log(res);
        this.showSuccessToast('OK!!', 'The User Has Been DeActivated Successfully.', 'success');
        this.showActivateButton = true;
        this.showStatus = false;
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.showErrorToast('ERROR!!', err.error.message, 'error');
      });
    }
    if (this.customerStatus == 'Suspend') {
      this.spinner.show();
      this.adminApiService.suspendUser({
        "UserId": this.customerId,
        "Reason": this.reason
      }).subscribe(res => {
        this.modalService.dismissAll();
        this.store.dispatch(new ChangeCustomerStatus({id: this.customerId, status: 2}));
        this.savebutton = false;
        this.spinner.hide();
        console.log(res);
        this.showSuccessToast('OK!!', 'The User Has Been Suspended Successfully.', 'success');
        this.showActivateButton = true;
        this.showStatus = false;
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.showErrorToast('ERROR!!', err.error.message, 'error');
      });

    }
  }

  downloadFile(fileName: any) {
    this.spinner.show();
    window.open(this.BaseUrl + fileName, "_blank")
    this.spinner.hide();
  }

}
