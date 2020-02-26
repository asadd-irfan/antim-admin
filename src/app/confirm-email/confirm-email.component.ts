import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  code: any;
  userID: any;
  newEmail = '';
  options: IndividualConfig;
  showMessage = false;
  internalError = false;
  showConfirmMessage = false;

  constructor(
    private adminService: AdminAPIsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.code = queryParams.get('code');
      this.userID = queryParams.get('userId');
      this.newEmail = queryParams.get('email');
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
    console.log(this.newEmail);
    if (this.newEmail) {
      this.adminService.ConfirmNewEmail(
        this.newEmail,
        this.userID,
        this.code
      ).subscribe((res) => {
        this.showConfirmMessage = true;
        console.log('resultt: ', res);
        this.showSuccessToast('OK!!', res.message, 'success');
        this.showMessage = false;
      }, err => {
        this.showConfirmMessage = false;
        if (err.status == 500) {
          this.internalError = true;
          this.showMessage = false;
        } else {
          this.showMessage = true;
          this.internalError = false;
        }
        console.log('error: ', err);
        // this.showErrorToast('Error!!', err.error.message, 'error');
      });
    } else {
      this.adminService.confirmEmail(
        this.userID,
        this.code
      ).subscribe(res => {
        this.showConfirmMessage = true;
        console.log('result: ', res);
        this.showSuccessToast('OK!!', res.message, 'success');
        this.showMessage = false;
      }, err => {
        this.showConfirmMessage = false;
        if (err.status == 500) {
          this.internalError = true;
          this.showMessage = false;
        } else {
          this.showMessage = true;
          this.internalError = false;
        }
        console.log('error: ', err);
        // this.showErrorToast('Error!!', err.error.message, 'error');
      });
    }
  }
}
