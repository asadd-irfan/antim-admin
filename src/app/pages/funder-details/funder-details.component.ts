import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeFunderStatus } from 'app/store/actions/admin.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-funder-details',
  templateUrl: './funder-details.component.html',
  styleUrls: ['./funder-details.component.scss']
})
export class FunderDetailsComponent implements OnInit {
  funderId: any;
  funderAllDetails: any;
  funderStatus: any;
  funderBankDetail: any;
  funderAddress: any;
  funderCity: any;
  funderBankName: any;
  funderBankAccountNumber: any;
  funderBankIBANNumber: any;
  funderFundingLimit: any;
  funderBalance: any;
  Balance: any;
  BalanceForm: FormGroup;
  disableSaveButton = false;
  options: IndividualConfig;
  savebutton = false;
  reason: any;
  showActivateButton: boolean;
  showStatus: boolean;
  showBalance: boolean;
  showStatusHeading: boolean;
  getState: Observable<any>;
  BaseUrl = environment.URLForDownloadFiles;
  accountStatements: any;
  ShowAccountStatements: boolean;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private form: FormBuilder,
    private modalService: NgbModal,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(AdminState);

    this.route.paramMap.subscribe(params => {
      this.funderId = params.get('id');
    });

    this.BalanceForm = form.group({
      'balance': [{ value: null, disabled: true }],
    });
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

  ngOnInit() {
    this.spinner.show();
    this.adminApiService.getUserDetails(this.funderId).subscribe(res => {
      this.spinner.hide();
      this.funderAllDetails = res.result;
      console.log(res);
      if (res.result.userAddresses.length > 0) {
        this.funderAddress = res.result.userAddresses[0].address;
        this.funderCity = res.result.userAddresses[0].city;
      }
      if (res.result.userBanks.length > 0) {
        this.funderBankName = res.result.userBanks[0].bankName;
        this.funderBankAccountNumber = res.result.userBanks[0].accountNumber;
        this.funderBankIBANNumber = res.result.userBanks[0].ibaNnumber;
      }
      if (res.result.funderProfile) {
        this.funderFundingLimit = res.result.funderProfile.fundingLimit;
      }
      this.funderBalance = res.result.balance;
      if (res.result.status == 0 || res.result.status == 2) {
        this.showBalance = false;
        this.showStatusHeading = true;
        this.showActivateButton = true;
        this.showStatus = false;
      }
      if (res.result.status == 1) {
        this.showBalance = true;
        this.showStatusHeading = true;
        this.showActivateButton = false;
        this.showStatus = true;
      }
      if (res.result.accountStatements && res.result.accountStatements.length == 0) {
        this.ShowAccountStatements = false;
        } else {
          this.ShowAccountStatements = true;
          this.accountStatements = res.result.accountStatements;
        }

    }, err => {
      this.spinner.hide();
      console.log(err);
    });

  }
  inputNumber(event) {
    console.log(event.target.value)
    if (event.target.value < 10000) {
      this.disableSaveButton = true;
    }
    if (event.target.value > 10000 || event.target.value == '') {
     this.disableSaveButton = false;
    }
  }
  AddBalance() {
    // this.disableSaveButton = true;
    this.BalanceForm.get('balance').enable();
  }
  SaveBalance() {
    this.spinner.show();
    this.adminApiService.addOrUpdateUserBalance({
      "UserId": this.funderId,
      "UserBalance": this.Balance
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.disableSaveButton = false;
      this.funderBalance = res.result;
      this.Balance = '';
      this.showSuccessToast('OK!!', 'Balance Added Successfully!', 'success');
      this.BalanceForm.get('balance').disable();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }
  OpenActivatePopup(content) {
    this.modalService.open(content, { centered: false });
  }
  onChange(deviceValue) {
    this.savebutton = true;
    if (deviceValue === 'deActive') {
      this.funderStatus = 'DeActivate';
    }
    if (deviceValue === 'suspend') {
      this.funderStatus = 'Suspend';
    }
  }

  OpenPopup(content1) {
    this.modalService.open(content1, { centered: false });
  }

  activateUser() {
    this.spinner.show();
    this.adminApiService.activateUser(this.funderId).subscribe(res => {
      this.modalService.dismissAll();
      this.spinner.hide();
      console.log(res);
      this.showSuccessToast('OK!!', 'The User Has Been Activated Successfully.', 'success');
      this.store.dispatch(new ChangeFunderStatus({id: this.funderId, status: 1}));
      this.showActivateButton = false;
      this.showStatus = true;
      this.showBalance = true;
    }, err => {
      this.modalService.dismissAll();
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });
  }

  ChangeStatus() {
    if (this.funderStatus == 'DeActivate') {
      this.spinner.show();
      this.adminApiService.deActivateUser({
        "UserId": this.funderId,
        "Reason": this.reason
      }).subscribe(res => {
        this.modalService.dismissAll();
        this.savebutton = false;
        this.spinner.hide();
        console.log(res);
        this.store.dispatch(new ChangeFunderStatus({id: this.funderId, status: 0}));
        this.showSuccessToast('OK!!', 'The User Has Been DeActivated Successfully.', 'success');
        this.showActivateButton = true;
        this.showStatus = false;
        this.showBalance = false;
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.showErrorToast('ERROR!!', err.error.message, 'error');
      });
    }
    if (this.funderStatus == 'Suspend') {
      this.spinner.show();
      this.adminApiService.suspendUser({
        "UserId": this.funderId,
        "Reason": this.reason
      }).subscribe(res => {
        this.modalService.dismissAll();
        this.savebutton = false;
        this.spinner.hide();
        console.log(res);
        this.store.dispatch(new ChangeFunderStatus({id: this.funderId, status: 2}));
        this.showSuccessToast('OK!!', 'The User Has Been Suspended Successfully.', 'success');
        this.showActivateButton = true;
        this.showStatus = false;
        this.showBalance = false;
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
