import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApplicationEvent } from '../model/applicationEvent';
import { UsageService } from '../services/usage.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'dateCreated'];
  dataSource = new MatTableDataSource<ApplicationEvent>();
  isLoading = true;
  expandedEvent: ApplicationEvent | null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(private usageService: UsageService, private route: Router) { }

  ngOnInit() {
    this.usageService.getEvents(1, 5).subscribe(a => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<ApplicationEvent>(a.data);
      this.paginator.length = a.total;
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
    .pipe(
        tap(() => this.loadEventsPage())
    )
    .subscribe();
}

loadEventsPage() {
  this.usageService.getEvents(this.paginator.pageIndex + 1,
    this.paginator.pageSize).subscribe(a => {
    this.dataSource = new MatTableDataSource<ApplicationEvent>(a.data);
    this.paginator.length = a.total;
  });
}

onRowClicked(applicationEvent: ApplicationEvent) {
  this.route.navigateByUrl('/event/' + applicationEvent.id);
}

}
