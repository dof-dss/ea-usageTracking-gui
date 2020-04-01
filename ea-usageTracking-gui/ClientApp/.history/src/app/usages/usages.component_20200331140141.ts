import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AuditService } from '../services/audit.service';
import { Audit } from '../model/audit';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-usages',
  templateUrl: './usages.component.html',
  styleUrls: ['./usages.component.scss']
})
export class UsagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
