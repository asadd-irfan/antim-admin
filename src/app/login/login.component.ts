import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  LoginForm: FormGroup;
  options: IndividualConfig;
  role: any;
  constructor(
    private router: Router,
    private adminService: AuthService,
    private spinner: NgxSpinnerService,
    public form: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    this.options.progressBar = true;
    this.LoginForm = form.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
    });
  }

  Login() {
    this.spinner.show();
    this.adminService.login({
      username: this.username,
      password: this.password
    }).subscribe(res => {
      const role = localStorage.getItem('role');
      if (role == 'admin') {
        this.router.navigateByUrl('/dashboard');
        this.spinner.hide();
      } else {
        localStorage.removeItem('role');
        this.showToast('Error!!', 'You do not have Administrator access.', 'error');
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.showToast('Error!!', err.error.error_description, 'error')
      console.log(err)
    });

  }

  ngOnInit() {
  }
  showToast(title: string, message: string, type: string) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

}
