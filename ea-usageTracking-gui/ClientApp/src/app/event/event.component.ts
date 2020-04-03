import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsageService } from '../services/usage.service';
import { ApplicationEvent } from '../model/applicationEvent';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  isLoading = true;
  isEdit = false;
  private id;
  applicationEvent: ApplicationEvent;
  isAboutToDelete = false;
 
  constructor(private activatedroute: ActivatedRoute, private usageService: UsageService) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.usageService.getEvent(this.id).subscribe(e => {
        this.applicationEvent = e;
        this.isLoading = false;
      });
  });
  }

  deleteEvent() {
    this.usageService.deleteEvent(this.applicationEvent).subscribe(r => {
      this.isAboutToDelete = false;
    });
  }

  updateEvent() {
  this.usageService.updateEvent(this.applicationEvent).subscribe(r => {
    this.isEdit = false;
  });

  }
}
