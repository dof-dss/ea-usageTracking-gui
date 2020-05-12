import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  MatToolbarModule,
          MatMenuModule,
          MatIconModule,
          MatButtonModule,
          MatTableModule,
          MatDividerModule,
          MatProgressSpinnerModule,
          MatInputModule,
          MatCardModule,
          MatSlideToggleModule,
          MatSelectModule,
          MatOptionModule,
          MatPaginatorModule,
          MatFormFieldModule} from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor } from './infrastructure/jwt.interceptor';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { UsagesComponent } from './usages/usages.component';
import { EventsComponent } from './events/events.component';
import { ApplicationComponent } from './application/application.component';
import { UsersComponent } from './users/users.component';
import { EventComponent } from './event/event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { UserComponent } from './user/user.component';
import { UserAppsComponent } from './user-apps/user-apps.component';
import { UserUsageComponent } from './user-usage/user-usage.component';
import { UserAppComponent } from './user-app/user-app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    AddApplicationComponent,
    AppLoginComponent,
    UsagesComponent,
    EventsComponent,
    ApplicationComponent,
    UsersComponent,
    EventComponent,
    AddEventComponent,
    UserComponent,
    UserAppsComponent,
    UserUsageComponent,
    UserAppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    appRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              /*{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },*/
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
