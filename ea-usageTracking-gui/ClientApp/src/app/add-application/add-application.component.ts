import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Application } from '../model/application';
import { Router } from '@angular/router';
import { UsageService } from '../services/usage.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {
  public isLoggedIn = false;
  constructor(
    private usageService: UsageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  applicationForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  application: Application;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }
  submit() {
    if (!this.applicationForm.invalid) {
      this.application = new Application();
      this.application.name = this.applicationForm.controls['name'].value;
      this.usageService
        .saveApplication(this.application)
        .subscribe(result => {
          this.router.navigate(['/application']);
        });
    }
  }
}
