import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;

  constructor(
    private router:Router,
    private _authService:AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this._authService.isLoggedIn(); 
  }

  logout() {
    this._authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(["/home"]);
}

}
