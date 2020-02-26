import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  @ViewChild('two', { static: false }) twoElement: ElementRef;
  @ViewChild('three', { static: false }) threeElement: ElementRef;
  @ViewChild('four', { static: false }) fourElement: ElementRef;

  options: IndividualConfig;
  adminDetails: any;
  // userAddress: any = [];
  userAddress: any;
  userBankInfo: any;
  userId: any;
  userName: any;
  firstName: any;
  lastName: any;
  email: any;
  phone: any;
  countryCode: any;
  NID: any;
  disabledButton = true;
  showOTPstep = false;
  OTP: any;
  first: number;
  second: number;
  third: number;
  Fourth: number;
  phoneNumber: any;
  numberEntered = false;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  EditForm: FormGroup;
  SaveButton = false;
  emailButton = false;
  phoneButton = false;
  passwordButton = false;

  constructor(
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 6000;

    this.EditForm = fb.group({
      'FirstName': [{ value: this.firstName, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'LastName': [{ value: this.lastName, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'UserName': [{ value: this.userName, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'MobileNo': [{ value: this.phone, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        // Validators.minLength(9)
      ])],
      'Email': [{ value: this.email, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'NID': [{ value: this.NID, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      'CountryCode': [{ value: this.countryCode, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'One': [''],
      'Two': [''],
      'Three': [''],
      'Four': [''],
      'OldPassword': [{ value: this.oldPassword, disabled: this.disabledButton },
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ]
      ],
      'NewPassword': [{ value: this.newPassword, disabled: this.disabledButton },
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ]
      ],
      'ConfirmPassword': [{ value: this.confirmPassword, disabled: this.disabledButton }]

      // 'Address': [{value: null, disabled: this.disabledButton}],
    });

  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  inputNumber(event) {
    this.phoneNumber = event.target.value;
    if (this.phoneNumber.length >= 9) {
      this.numberEntered = true;
    } else {
      this.numberEntered = false;
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.adminApiService.getAdminData().subscribe(res => {
      console.log(res.result);
      this.adminDetails = res.result;
      this.userId = res.result.id;
      this.firstName = res.result.firstName;
      this.lastName = res.result.lastName;
      this.userName = res.result.userName;
      this.countryCode = res.result.dialingCode;
      this.NID = res.result.nationalIdNumber;
      this.phone = res.result.phoneNumber;
      this.email = res.result.email;
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  EditInfo() {
    this.SaveButton = true;
    this.emailButton = true;
    this.phoneButton = true;
    this.EditForm.get('FirstName').enable();
    this.EditForm.get('LastName').enable();
    this.EditForm.get('UserName').enable();
    this.EditForm.get('NID').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('CountryCode').enable();
  }
  editEmail() {
    if (this.email == '') {
      this.showErrorToast('Error!!', 'Please Enter Email.', 'error');
    } else {
      this.spinner.show();
      this.adminApiService.editEmail({
        'Id': this.userId,
        'NewEmail': this.email,
        'UserName': this.userName
      }).subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.emailButton = false;
        this.EditForm.get('Email').disable();
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
    }
  }

  editMobileNo() {
    if (this.phone == '' || this.countryCode == null) {
      this.showErrorToast('Error!!', 'Please Enter Proper Mobile Number.', 'error');
    } else {
      this.spinner.show();
      this.adminApiService.editUserPhoneNumber({
        'Id': this.userId,
        'PhoneNumber': this.phone,
        'DialingCode': this.countryCode
      }).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        this.showSuccessToast('OK!!', res.message, 'success');
        this.phoneButton = false;
        this.showOTPstep = true;
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
    }
  }
  keytab(event, next) {
    if (next === 1) {
      setTimeout(() => {
        this.twoElement.nativeElement.focus();
      }, 0);
    } else if (next === 2) {
      setTimeout(() => {
        this.threeElement.nativeElement.focus();
      }, 0);
    } else if (next === 3) {
      setTimeout(() => {
        this.fourElement.nativeElement.focus();
      }, 0);
    }
  }
  verifyOTP() {
    this.OTP = '' + this.first + this.second + this.third + this.Fourth;
    this.spinner.show();
    this.adminApiService.confirmNewPhoneNumber({
      'Id': this.userId,
      'VerificationCode': this.OTP,
      'PhoneNumber': this.phone,
      'DialingCode': this.countryCode
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.showSuccessToast('OK!!', res.message, 'success');
      this.showOTPstep = false;
      this.EditForm.get('MobileNo').disable();
      this.EditForm.get('CountryCode').disable();
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }
  ResendOTP() {
    this.spinner.show();
    this.adminApiService.resendOtpForPhoneNumber({
      'Id': this.userId,
      'PhoneNumber': this.phone,
      'DialingCode': this.countryCode
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.showSuccessToast('OK!!', res.message, 'success');
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }

  SaveInfo() {
    this.spinner.show();
    this.adminApiService.editUser({
      'FirstName': this.firstName,
      'LastName': this.lastName,
      'UserName': this.userName,
      'NationalIdNumber': this.NID,
    }).subscribe(res => {
      this.spinner.hide();
      // console.log(res);
      this.showSuccessToast('OK!!', res.message, 'success');
      this.EditForm.get('FirstName').disable();
      this.EditForm.get('LastName').disable();
      this.EditForm.get('UserName').disable();
      this.EditForm.get('NID').disable();
      this.SaveButton = false;
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });


  }

  editPassword() {
    this.passwordButton = true;
    this.EditForm.get('OldPassword').enable();
    this.EditForm.get('NewPassword').enable();
    this.EditForm.get('ConfirmPassword').enable();
  }

  changeCurrentPassword() {
    this.spinner.show();
    this.adminApiService.changePassword({
      'Id': this.userId,
      'OldPassword': this.oldPassword,
      'NewPassword': this.newPassword,
      'ConfirmPassword': this.confirmPassword
    }).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.EditForm.get('OldPassword').disable();
      this.EditForm.get('NewPassword').disable();
      this.EditForm.get('ConfirmPassword').disable();
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordButton = false;
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      if (err.error.message == 'Incorrect password.') {
        this.showErrorToast('Error!!', 'Incorrect Old Password', 'error');
      } else {
        this.showErrorToast('Error!!', err.error.message, 'error');
      }
    });
  }

}
