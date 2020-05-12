import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public isLoggedIn = false;
  constructor(private _authService:AuthService, private router: Router) { }

  ngOnInit(){
    this._authService.isLoggedIn().subscribe(result => {
      this.isLoggedIn = result;
  });  
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1){
        this._authService.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  login() {
      const authEndpoint = `${environment.authUri}/oauth2/authorize?response_type=code&client_id=${environment.clientId}&redirect_uri=${environment.redirectUri}`;
      window.location.href = authEndpoint;
    }

  appLogin() {
    this.router.navigateByUrl('/app-login');
  }

  logout() {
      this._authService.logout();
      this.isLoggedIn = false;
  }

}
