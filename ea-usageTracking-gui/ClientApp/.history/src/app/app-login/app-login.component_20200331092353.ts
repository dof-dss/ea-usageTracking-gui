import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  private clientId;
  private secret;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {

  }

}
