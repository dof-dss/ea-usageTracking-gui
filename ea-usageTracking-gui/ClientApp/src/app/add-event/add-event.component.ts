import { Component, OnInit } from '@angular/core';
import { UsageService } from '../services/usage.service';
import { Router } from '@angular/router';
import { ApplicationEvent } from '../model/applicationEvent';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  applicationEvent: ApplicationEvent;

  constructor(private usageService: UsageService, private route: Router) {}

  ngOnInit() {
    this.applicationEvent = new ApplicationEvent();
  }

  save() {
    this.usageService.createEvent(this.applicationEvent).subscribe(r => {
      this.route.navigateByUrl('/event/' + r.id);
    });
  }
}
