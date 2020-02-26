import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  PasswordForm: FormGroup;
  password: any;
  confirmPassword: any;
  token: any;
  userID: any;
  options: IndividualConfig;
  disabledSubmitButton = true;
  @HostListener('input') oninput() {
    if (this.PasswordForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}

  constructor(private fb: FormBuilder,
    private RPservice: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.options = this.toastr.toastrConfig;
      this.options.positionClass = 'toast-top-right';
      this.options.timeOut = 6000;
      this.options.progressBar = true;

    this.PasswordForm = fb.group({
      'password': ['', [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      'confirmPassword': ['', [ Validators.required ] ],
      });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.token = queryParams.get('code');
      this.userID = queryParams.get('userId');
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }
  ResetPassword() {
    if (this.password !== this.confirmPassword) {
      this.showErrorToast('Error!!', 'Password Must Match', 'error');
    } else {
    this.spinner.show();
    this.RPservice.resetPassword({
      'userId': this.userID,
      'code': this.token,
      'newPassword': this.password
      }).subscribe(  async (res) => {
        console.log('res', res);
          this.spinner.hide();
          this.router.navigateByUrl('/login');
          this.showSuccessToast('OK!!', res.message, 'success');
      }, err => {
        console.log('err', err);
        this.spinner.hide();
          if (err.error.message) {
            this.showErrorToast('Error!!', err.error.message, 'error');
          }
      });
    }
  }

}
