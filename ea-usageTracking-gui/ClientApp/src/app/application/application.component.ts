import { Component, OnInit } from '@angular/core';
import { UsageService } from '../services/usage.service';
import { Application } from '../model/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  application: Application;
  isLoading = true;

  constructor(private usageService: UsageService) { }

  ngOnInit() {
    this.usageService.getApplication().subscribe(a => {
      this.application = a;
      this.isLoading = false;
    });
  }

}
