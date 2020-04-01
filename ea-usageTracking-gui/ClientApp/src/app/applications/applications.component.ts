import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { Application } from '../model/application';
import { MatPaginator } from "@angular/material/paginator";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs";
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})


export class ApplicationsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'dateCreated', 'name', 'description', 'clientId'];
  dataSource = new MatTableDataSource<Application>();
  isLoading = true;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(private applicationService: ApplicationService,
              private router: Router) {}

  ngOnInit() {
    this.applicationService.getApplications(1, 5).subscribe(a => {
      this.dataSource = new MatTableDataSource<Application>(a.data);
      this.isLoading = false;
      this.paginator.length = a.total;
    });
  }

  ngAfterViewInit() {
      merge(this.paginator.page)
      .pipe(
          tap(() => this.loadApplicationsPage())
      )
      .subscribe();

  }

  loadApplicationsPage() {
    this.applicationService.getApplications(this.paginator.pageIndex+1,
      this.paginator.pageSize).subscribe(a => {
      this.dataSource = new MatTableDataSource<Application>(a.data);
      this.paginator.length = a.total;
    });
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
