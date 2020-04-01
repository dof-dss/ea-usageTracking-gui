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
import { AuditslistComponent } from './auditslist/auditslist.component';
import { ApplicationsComponent } from './applications/applications.component';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor } from './infrastructure/jwt.interceptor';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { UsagesComponent } from './usages/usages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    AuditslistComponent,
    ApplicationsComponent,
    HeaderComponent,
    LoginComponent,
    AddApplicationComponent,
    AppLoginComponent,
    UsagesComponent
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
    MatProgressSpinnerModule,
    
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              /*{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },*/
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
