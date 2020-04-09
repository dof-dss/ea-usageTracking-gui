import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsagesComponent } from './usages/usages.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AuthGuard } from './infrastructure/auth.guard';

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
    path: 'usages',
    component: UsagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event/:id',
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-application',
    component: AddApplicationComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
