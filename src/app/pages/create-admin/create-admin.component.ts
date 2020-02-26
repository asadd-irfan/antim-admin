import { Component, OnInit } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {


  options: IndividualConfig;
  AdminForm: FormGroup;
  firstName: any;
  lastName: any;
  userName: any;
  NID: any;
  email: any;
  phone: any;
  countryCode: any;
  password: any;
  confirmPassword: any;
  phoneNumber: any;
  numberEntered = false;


  constructor(
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 6000;

    this.AdminForm = fb.group({
      'FirstName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'LastName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'Username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'NID': [null, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      'Email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'password': [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ]
      ],
      'confirmPassword': [null, Validators.compose([
        Validators.required,
      ])],
      'CountryCode': [null, Validators.compose([
        Validators.required
      ])],
      'MobileNo': [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
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
  createAdmin() {
    this.spinner.show();
    this.adminApiService.createNewAdmin({
        "FirstName": this.firstName,
        "LastName": this.lastName,
        "Email": this.email,
        "NationalIdNumber": this.NID,
        "UserName": this.userName,
        "Password": this.password,
        "ConfirmPassword": this.confirmPassword,
        "PhoneNumber": this.phone,
        "DialingCode": this.countryCode
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res)
      this.showSuccessToast('OK!!',  res.message, 'success');
      this.AdminForm.reset();
    }, err => {
      this.spinner.hide();
      console.log(err)
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    });
  }



  ngOnInit() {
    // this.spinner.show();
  }

}
