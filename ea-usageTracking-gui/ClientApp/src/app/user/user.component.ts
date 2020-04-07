import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { User } from '../model/user';
import { UsageService } from '../services/usage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Usage } from '../model/usage';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  isLoading = true;
  user: User;
  id: string;
  displayedColumns: string[] = [
    'id',
    'applicationName',
    'applicationEventId',
    'applicationEventName',
    'dateCreated',
  ];
  dataSource = new MatTableDataSource<Usage>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    private activatedroute: ActivatedRoute,
    private usageService: UsageService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.usageService.getUser(this.id).subscribe((u) => {
        this.user = u;
        this.isLoading = false;
      });
      this.usageService.getUsagesByUser(this.id, 1, 5).subscribe((a) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<Usage>(a.data);
        this.paginator.length = a.total;
      });
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(tap(() => this.loadUsagesPage()))
      .subscribe();
  }

  loadUsagesPage() {
    this.usageService
      .getUsagesByUser(this.id, this.paginator.pageIndex + 1, this.paginator.pageSize)
      .subscribe((a) => {
        this.dataSource = new MatTableDataSource<Usage>(a.data);
        this.paginator.length = a.total;
      });
  }
}
