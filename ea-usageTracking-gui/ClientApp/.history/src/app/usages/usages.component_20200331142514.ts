import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UsageService } from '../services/usage.service';
import { Usage } from '../model/usage';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-usages',
  templateUrl: './usages.component.html',
  styleUrls: ['./usages.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsagesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'applicationId', 'applicationName', 'applicationEventId', 'applicationEventName',
  'applicationUserId', 'applicationUserName', 'dateCreated', 'isComplete' ];
  dataSource = new MatTableDataSource<Usage>();
  isLoading = true;
  expandedAudit: Usage | null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(private usageService: UsageService) { }

  ngOnInit() {
    this.usageService.getUsages(1, 5).subscribe(a => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<Usage>(a.data);
      this.paginator.length = a.total;
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
    .pipe(
        tap(() => this.loadUsagesPage())
    )
    .subscribe();
}

loadUsagesPage() {
  this.usageService.getUsages(this.paginator.pageIndex + 1,
    this.paginator.pageSize).subscribe(a => {
    this.dataSource = new MatTableDataSource<Usage>(a.data);
    this.paginator.length = a.total;
  });
}
}
