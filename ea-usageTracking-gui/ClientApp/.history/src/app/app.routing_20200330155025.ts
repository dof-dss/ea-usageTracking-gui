import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuditslistComponent } from './auditslist/auditslist.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AuthGuard } from './infrastructure/auth.guard';
import { Role } from './model/role';

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
        path: 'addapplication',
        component: AddApplicationComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
