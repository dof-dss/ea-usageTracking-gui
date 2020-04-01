import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AuditService } from '../services/audit.service';
import { Audit } from '../model/audit';
import { MatPaginator } from "@angular/material/paginator";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs";
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-auditslist',
  templateUrl: './auditslist.component.html',
  styleUrls: ['./auditslist.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AuditslistComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'dateCreated', 'application', 'subjectId', 'subject', 'actorId','actor', 'description'];
  dataSource = new MatTableDataSource<Audit>();
  isLoading = true;
  expandedAudit: Audit | null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(private auditService: AuditService) {}

  ngOnInit() {
    this.auditService.getAudits(1, 5).subscribe(a => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<Audit>(a.data);
      this.paginator.length = a.total;
    });
  }

  ngAfterViewInit() {
      merge(this.paginator.page)
      .pipe(
          tap(() => this.loadAuditsPage())
      )
      .subscribe();
  }

  loadAuditsPage() {
    this.auditService.getAudits(this.paginator.pageIndex+1,
      this.paginator.pageSize).subscribe(a => {
      this.dataSource = new MatTableDataSource<Audit>(a.data);
      this.paginator.length = a.total;
    });
  }
 

}
