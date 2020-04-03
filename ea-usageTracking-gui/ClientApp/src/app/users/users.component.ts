import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { User } from '../model/user';
import { UsageService } from '../services/usage.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'dateCreated'];
  dataSource = new MatTableDataSource<User>();
  isLoading = true;
  expandedUser: User | null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private usageService: UsageService) {}

  ngOnInit() {
    this.usageService.getUsers(1, 5).subscribe(a => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<User>(a.data);
      this.paginator.length = a.total;
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(tap(() => this.loadEventsPage()))
      .subscribe();
  }

  loadEventsPage() {
    this.usageService
      .getUsers(this.paginator.pageIndex + 1, this.paginator.pageSize)
      .subscribe(a => {
        this.dataSource = new MatTableDataSource<User>(a.data);
        this.paginator.length = a.total;
      });
  }
}
