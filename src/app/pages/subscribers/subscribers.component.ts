import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

let AllSubscribers: any[] = [];
@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  subscribersList: any;
  email: any;
  showSubscribers: boolean;
  displayedColumns: string[] = ['no', 'date', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>(AllSubscribers);
  options: IndividualConfig;

  constructor(
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {
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
    this.adminApiService.getSubscribersList().subscribe(res => {
      this.spinner.hide();
      console.log(res);
      // if (res.message) {
      //   this.showSubscribers = false;
      //   this.dataSource = new MatTableDataSource<any>(null);
      // } else {
      AllSubscribers.length = 0;
      let i = 1;
      this.showSubscribers = true;
      this.subscribersList = res.result;
      this.subscribersList.forEach(element => {
        AllSubscribers.push(element);
        element.date = moment(element.createdAt).format('LL');
        element.no = i;
        i++;
      });
      this.dataSource = new MatTableDataSource<any>(AllSubscribers);
      this.dataSource.paginator = this.paginator;
      // }
    }, err => {
      this.showSubscribers = false;
      this.dataSource = new MatTableDataSource<any>(null);
      this.spinner.hide();
      console.log(err);
    });
  }
  Search(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.showSubscribers = false;
    } else {
      this.showSubscribers = true;
    }
  }
  openPopUp(content, Email) {
    this.email = Email;
    this.modalService.open(content, { centered: false });
  }
  UnSubscribe() {
    this.spinner.show();
    this.adminApiService.deleteSubscriber(this.email).subscribe(res => {
      console.log(res);
      this.ngOnInit();
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.dismissAll();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }

}
