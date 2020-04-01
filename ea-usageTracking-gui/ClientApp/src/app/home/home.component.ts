import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'home-header',
  providers: [AuthService],
  templateUrl: './home.component.html',
})


export class HomeComponent {
  public isLoggedIn = false;

    constructor(
        private _authService:AuthService){}
 
    ngOnInit(){
        this.isLoggedIn = this._authService.isLoggedIn();    
        let i = window.location.href.indexOf('code');
        if(!this.isLoggedIn && i != -1){
            this._authService.retrieveToken(window.location.href.substring(i + 5));
        }
    }

    login() {
        window.location.href = environment.authUri+'/oauth2/authorize?response_type=code&client_id=' + environment.clientId + '&redirect_uri='+ environment.redirectUri;
    }
 
    logout() {
        this._authService.logout();
        this.isLoggedIn = false;
    }
}
