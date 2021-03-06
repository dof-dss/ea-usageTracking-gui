import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription, Subject } from 'rxjs';
import { User } from '../model/user';
import { catchError, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UsageRoles } from '../infrastructure/usage-roles.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loggedIn: Subject<boolean>;
  public usageRole: Subject<UsageRoles>;

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.loggedIn = new Subject<boolean>();
    this.loggedIn.next(false);

    this.usageRole = new Subject<UsageRoles>();
    this.usageRole.next(UsageRoles.Undefined);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentAccessToken() {
    return localStorage.getItem('access_token');
  }

  public get currentIdToken() {
    return localStorage.getItem('id_token');
  }

  getClientCredentials(clientId: string, secret: string): Observable<boolean> {
    const encodedDetails = 'Basic ' + window.btoa(clientId + ':' + secret);
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: encodedDetails,
    });

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    this._http
      .post(
        environment.authUri + '/oauth2/token?grant_type=client_credentials',
        null,
        { headers: headers }
      )
      .subscribe(
        (data) => {
          this.loggedIn.next(true);
          this.setSession(data);
        },
        (err) => {
          localStorage.setItem('auth_error', err.error.error_description);
        }
      );

    return of(true);
  }

  retrieveToken(code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', environment.clientId);
    params.append('redirect_uri', environment.redirectUri);
    params.append('code', code);

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    });
    this._http
      .post(environment.authUri + '/oauth2/token', params.toString(), {
        headers: headers,
      })
      .subscribe(
          (data) => {
            this.loggedIn.next(true);
            this.setSession(data);
            this.retrieveUser();
          },
          (err) => {
            localStorage.setItem('auth_error', err.error.error_description);
          }
        );
  }

  retrieveUser() {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    this._http
      .get(environment.authUri + '/oauth2/userInfo', { headers: headers })
      .subscribe(
        (data) => {
          this.setUser(data);
        },
        (err) => {
          localStorage.setItem('auth_error', err.error.error_description);
        }
      );
  }

  getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + localStorage.get('access_token'),
    });
    return this._http
      .get(resourceUrl, { headers: headers })
      .pipe(catchError(this.handleError<any>('Server error')));
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    // Shouldn't do this, but AWS Cognito doesn't support Implicit Grant flow refresh with prompt=none
    // sop have to use Auth Code Grant flow
    localStorage.setItem('refresh_token', authResult.refresh_token);

    const decodedAccessToken = jwt_decode(authResult.access_token);
    const roles = decodedAccessToken.scope.split(' ');

    if (roles.some((r) => r === 'usage-api/usage_app')) {
      this.usageRole.next(UsageRoles.Application);
    } else if (roles.some((r) => r === 'usage-api/usage_user')) {
      this.usageRole.next(UsageRoles.User);
    }

    localStorage.setItem('roles', roles);
  }

  private setUser(userInfoResult) {
    localStorage.setItem('user_email', userInfoResult.email);
    localStorage.setItem('user_sub', userInfoResult.sub);
    // Clear error
    localStorage.removeItem('auth_error');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token');
    // userInfo
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_sub');
    this.loggedIn.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return of(moment().isBefore(this.getExpiration()));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
