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

  displayedColumns: string[] = ['id', 'dateCreated', 'application', 'eventId', 'event', 'userId', 'user' ];
  dataSource = new MatTableDataSource<Usage>();
  isLoading = true;
  expandedAudit: Usage | null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('input', {static: false}) input: ElementRef;
  constructor(private usageService: UsageService) { }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}
