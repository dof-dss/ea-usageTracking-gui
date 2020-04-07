import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuditslistComponent } from './auditslist/auditslist.component';
import { UsagesComponent } from './usages/usages.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AuthGuard } from './infrastructure/auth.guard';
import { Role } from './model/role';
import { EventsComponent } from './events/events.component';
import { ApplicationComponent } from './application/application.component';
import { UsersComponent } from './users/users.component';
import { EventComponent } from './event/event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app-login',
    component: AppLoginComponent
  },
  {
    path: 'audits',
    component: AuditslistComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'usages',
    component: UsagesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'event/:id',
    component: EventComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-application',
    component: AddApplicationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
