import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UsageService } from '../services/usage.service';
import { Usage } from '../model/usage';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { UsagePerUserService } from '../services/usage-per-user.service';
import { Application, RegisterCommand } from '../model/application';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-apps',
  templateUrl: './user-apps.component.html',
  styleUrls: ['./user-apps.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserAppsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['applicationId', 'name', 'dateCreated', 'isRegistered'];
  dataSource = new MatTableDataSource<Application>();
  isLoading = true;
  expandedUsage: Usage | null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(private usageService: UsagePerUserService, private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.usageService.getAllApps(1, 5).subscribe(a => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<Application>(a.data);
      this.paginator.length = a.total;
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
    .pipe(
        tap(() => this.loadAppsPage())
    )
    .subscribe();
}

loadAppsPage() {
  this.usageService.getAllApps(this.paginator.pageIndex + 1,
    this.paginator.pageSize).subscribe(a => {
    this.dataSource = new MatTableDataSource<Application>(a.data);
    this.paginator.length = a.total;
  });
}

goToDetails(application: Application) {
  this.route.navigateByUrl('/user-app/' + application.applicationId);
}

register(application: Application) {
  const registerCommand = new RegisterCommand();
  registerCommand.applicationId = application.applicationId;
  registerCommand.identityToken = this.authService.currentIdToken;
  this.usageService.registerApp(registerCommand).subscribe(result => {
    this.loadAppsPage();
  });
}
}
