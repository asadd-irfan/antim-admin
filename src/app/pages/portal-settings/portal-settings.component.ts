import { Component, OnInit } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-portal-settings',
  templateUrl: './portal-settings.component.html',
  styleUrls: ['./portal-settings.component.scss']
})
export class PortalSettingsComponent implements OnInit {
  DeliveryFeeForm: FormGroup;
  SocialLinksForm: FormGroup;
  disableSaveButton = true;
  disableFbButton = true;
  disableTwitterButton = true;
  disableInstaButton = true;
  deliveryFee: number;
  facebook: any;
  twitter: any;
  instagram: any;
  configData: any;
  options: IndividualConfig;

  constructor(
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private form: FormBuilder,
  ) {
    this.DeliveryFeeForm = form.group({
      'Fees': [{ value: null, disabled: true }],
    });
    this.SocialLinksForm = form.group({
      'Facebook': [{ value: null, disabled: true }],
      'Twitter': [{ value: null, disabled: true }],
      'Instagram': [{ value: null, disabled: true }],
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
    this.adminApiService.getConfigData().subscribe(res => {
      this.configData = res.result;
      this.configData.map(element => {
        if (element.key == "deliveryFees") {
          this.deliveryFee = element.value;
        }
        if (element.key == "facebook") {
          this.facebook = element.value;
        }
        if (element.key == "twitter") {
          this.twitter = element.value;
        }
        if (element.key == "instagram") {
          this.instagram = element.value;
        }
      })
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  EditFee() {
    this.disableSaveButton = false;
    this.DeliveryFeeForm.get('Fees').enable();
  }
  SaveDeliveryFee() {
    this.spinner.show();
    this.adminApiService.editConfigData({
      "Key": "deliveryFees",
      "Value": this.deliveryFee
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.disableSaveButton = true;
      this.showSuccessToast('OK!!', 'Delivery fees Edited Successfully!', 'success');
      this.DeliveryFeeForm.get('Fees').disable();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }

  EditFB() {
    this.disableFbButton = false;
    this.SocialLinksForm.get('Facebook').enable();
  }
  SaveFbLink() {
    this.spinner.show();
    this.adminApiService.editConfigData({
      "Key": "facebook",
      "Value": this.facebook
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.disableFbButton = true;
      this.showSuccessToast('OK!!', 'Facebook Link Edited Successfully!', 'success');
      this.SocialLinksForm.get('Facebook').disable();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }
  EditTwitter() {
    this.disableTwitterButton = false;
    this.SocialLinksForm.get('Twitter').enable();
  }
  SaveTwitterLink() {
    this.spinner.show();
    this.adminApiService.editConfigData({
      "Key": "twitter",
      "Value": this.twitter
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.disableTwitterButton = true;
      this.showSuccessToast('OK!!', 'Twitter Link Edited Successfully!', 'success');
      this.SocialLinksForm.get('Twitter').disable();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }
  EditInsta() {
    this.disableInstaButton = false;
    this.SocialLinksForm.get('Instagram').enable();
  }
  SaveInstaLink() {
    this.spinner.show();
    this.adminApiService.editConfigData({
      "Key": "instagram",
      "Value": this.instagram
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.disableInstaButton = true;
      this.showSuccessToast('OK!!', 'Instagram Link Edited Successfully!', 'success');
      this.SocialLinksForm.get('Instagram').disable();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }


}
