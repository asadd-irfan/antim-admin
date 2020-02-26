import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';
import { GetFunderRequests, AddNotification } from '../../store/actions/admin.actions';

let AllFunderRequests: any[] = [];

@Component({
  selector: 'app-funders-requests',
  templateUrl: './funders-requests.component.html',
  styleUrls: ['./funders-requests.component.scss']
})

export class FundersRequestsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['reqName', 'reqNumber', 'funderName', 'date', 'price', 'status'];
  dataSource = new MatTableDataSource<any>(AllFunderRequests);
  funderRequestsData: any;
  funderID: any;
  options: IndividualConfig;
  showMessage = false;
  requestType: any;

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
  getState: Observable<any>;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(AdminState);

    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    this.requestType = 'All Requests';
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  getFunderRequests() {
    return new Promise((resolve, reject) => {
      this.getState.subscribe((state) => {
        // console.log('In FunderRequests state : ', state);
        if (state.AllFunderRequests.length == 0) {
          this.store.dispatch(new GetFunderRequests());
        }
        this.funderRequestsData = state.AllFunderRequests;
        if (state.AllFunderRequests.length > 0) {
          resolve();
        }
      });
    });
  }

  ngOnInit() {
    let funderRequestType = localStorage.getItem('funderRequestType');
    let selectedFunderRequestType = localStorage.getItem('selectedFunderRequestType');

    this.getFunderRequests().then(e => {
      if (this.funderRequestsData.length > 0) {
        this.showMessage = false;
        AllFunderRequests.length = 0;
        this.funderRequestsData.forEach(element => {
          element.forEach(funder => {
            let updatedFunderRequests = Object.assign({}, funder)
            updatedFunderRequests.date = moment(funder.startingDate).format('L');
            updatedFunderRequests.price = funder.fundedAmount + ' SAR';
            updatedFunderRequests.status = this.requestTypes[funder.requestType].type;
            AllFunderRequests.push(updatedFunderRequests);
          });
        });
        this.dataSource = new MatTableDataSource<any>(AllFunderRequests);
        console.log('AllFunderRequests:', AllFunderRequests);
        this.spinner.hide();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<any>(null);
        this.showMessage = true;
      }
      if (funderRequestType == selectedFunderRequestType && funderRequestType != null && selectedFunderRequestType != null) {
        this.requestType = funderRequestType;
        this.dataSource.filter = funderRequestType;
      } else {
        this.requestType = 'All Requests';
        this.dataSource.filter = '';
      }
    });
    if (this.funderRequestsData.length == 0) {
      this.showMessage = true;
    }

  }

  ngOnDestroy(): void {
    localStorage.removeItem('funderRequestType');
  }

  openProductDetails(row) {
    this.funderID = row.id;
    this.router.navigate(['funders-requests', this.funderID]);
  }

  onChange(deviceValue) {
    this.dataSource.filter = deviceValue;
    this.requestType = deviceValue;
    localStorage.setItem('selectedFunderRequestType', deviceValue);
    if (deviceValue == 'All Requests') {
      this.dataSource.filter = '';
      this.requestType = 'All Requests';
    }
    if (this.dataSource.filteredData.length > 0) {
      this.showMessage = false;
    } else {
      this.showMessage = true;
    }
  }

  Search(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }
}
