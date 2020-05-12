import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsageRoles } from '../infrastructure/usage-roles.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  isApp: boolean;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {
    this.isApp = false;
  }

  ngOnInit() {
    this._authService.loggedIn.subscribe(result => {
      this.isLoggedIn = result;
  });
  this._authService.usageRole.subscribe(result => {
    if (result === UsageRoles.Application) {
      this.isApp = true;
    }
  });
  }

  logout() {
    this._authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
}

}
