import {Component,OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { ApplicationService } from '../services/application.service';
import { CreateAuditApplicationCommand } from '../model/application';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {  
  public isLoggedIn = false;
  constructor(private _authService:AuthService,
              private _applicationservice:ApplicationService,
              private fb: FormBuilder,
              private router: Router) { 

      }

      applicationForm: FormGroup; 
      matcher = new MyErrorStateMatcher();
      createAuditApplicationCommand: CreateAuditApplicationCommand;

  ngOnInit(){
    this.isLoggedIn = this._authService.isLoggedIn();   
    this.createForm(); 
  }

  createForm() {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required,Validators.maxLength(500)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      clientId: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }
  submit() {
    if(!this.applicationForm.invalid){
    console.log(this.applicationForm.value);
    this.createAuditApplicationCommand = this.applicationForm.value;
    console.log(this.createAuditApplicationCommand);
    this._applicationservice.insertApplication(this.createAuditApplicationCommand);
    this.router.navigate(['/applications']);
    }
    //this._applicationservice.insertApplication();
  }

}
