import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersRequestsComponent } from '../../pages/customers-requests/customers-requests.component';
import { FundersRequestsComponent } from '../../pages/funders-requests/funders-requests.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { FundersComponent } from '../../pages/funders/funders.component';
import { UserComponent } from '../../pages/user/user.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { CreateAdminComponent } from '../../pages/create-admin/create-admin.component';

import {MatIconModule} from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CustomerDetailsComponent } from '../../pages/customer-details/customer-details.component';
import { FunderDetailsComponent } from '../../pages/funder-details/funder-details.component';
import { CustomerRequestDetailsComponent } from '../../pages/customer-request-details/customer-request-details.component';
import { FunderRequestDetailsComponent } from '../../pages/funder-request-details/funder-request-details.component';
import { UserMessagesComponent } from '../../pages/user-messages/user-messages.component';
import { NumberOnlyDirective } from './../../number-only.directive';
import {MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../../store/effects/app.effects';
import { reducers } from '../../store/app.states';
import { PortalSettingsComponent } from '../../pages/portal-settings/portal-settings.component';
import { StaticPagesComponent } from '../../pages/static-pages/static-pages.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SubscribersComponent } from '../../pages/subscribers/subscribers.component';
import { MessagesCardComponent } from '../../pages/messages-card/messages-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatTooltipModule,
    MatTabsModule
    // StoreModule.forFeature('notificationFeature', reducers)
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
 ],
  declarations: [
    DashboardComponent,
    CustomersRequestsComponent,
    FundersRequestsComponent,
    CustomersComponent,
    FundersComponent,
    UserComponent,
    CustomerDetailsComponent,
    FunderDetailsComponent,
    CustomerRequestDetailsComponent,
    FunderRequestDetailsComponent,
    NumberOnlyDirective,
    NotificationsComponent,
    UserMessagesComponent,
    CreateAdminComponent,
    PortalSettingsComponent,
    StaticPagesComponent,
    SubscribersComponent,
    MessagesCardComponent,

  ]
})

export class AdminLayoutModule {}
