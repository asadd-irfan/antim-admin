import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersRequestsComponent } from '../../pages/customers-requests/customers-requests.component';
import { FundersRequestsComponent } from '../../pages/funders-requests/funders-requests.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { FundersComponent } from '../../pages/funders/funders.component';
import { UserComponent } from '../../pages/user/user.component';
import { CustomerDetailsComponent } from '../../pages/customer-details/customer-details.component';
import { FunderDetailsComponent } from '../../pages/funder-details/funder-details.component';
import { CustomerRequestDetailsComponent } from '../../pages/customer-request-details/customer-request-details.component';
import { FunderRequestDetailsComponent } from '../../pages/funder-request-details/funder-request-details.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserMessagesComponent } from '../../pages/user-messages/user-messages.component';
import { CreateAdminComponent } from '../../pages/create-admin/create-admin.component';
import { PortalSettingsComponent } from '../../pages/portal-settings/portal-settings.component';
import { StaticPagesComponent } from '../../pages/static-pages/static-pages.component';
import { SubscribersComponent } from '../../pages/subscribers/subscribers.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customers-requests', component: CustomersRequestsComponent },
    { path: 'customers-requests/:id', component: CustomerRequestDetailsComponent },
    { path: 'funders-requests', component: FundersRequestsComponent },
    { path: 'funders-requests/:id', component: FunderRequestDetailsComponent },
    { path: 'funders', component:  FundersComponent},
    { path: 'funders/:id', component:  FunderDetailsComponent},
    { path: 'customers', component: CustomersComponent  },
    { path: 'customers/:id', component: CustomerDetailsComponent  },

    { path: 'notifications', component: NotificationsComponent },
    { path: 'profile',  component: UserComponent },
    { path: 'messages',  component: UserMessagesComponent },
    { path: 'create-admin',  component: CreateAdminComponent },
    { path: 'settings',  component: PortalSettingsComponent },
    { path: 'static-pages',  component: StaticPagesComponent },
    { path: 'subscribers',  component: SubscribersComponent },
];
