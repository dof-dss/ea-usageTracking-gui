import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  private clientId;
  private secret;

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.getClientCredentials(this.clientId, this.secret).subscribe(result => {
      this.router.navigateByUrl('/');
    });
  }

}
