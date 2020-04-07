import { Component, OnInit } from '@angular/core';
import { UsageService } from '../services/usage.service';
import { Application } from '../model/application';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  application: Application;
  isLoading = true;
  noApplication = false;

  constructor(private usageService: UsageService, private route: Router) {}

  ngOnInit() {
    this.usageService.getApplication().subscribe(
      a => {
        this.application = a;
        this.isLoading = false;
        this.noApplication = false;
      },
      e => {
        this.noApplication = true;
        this.isLoading = false;
      }
    );
  }

  create() {
    this.route.navigateByUrl('/add-application');
  }
}
