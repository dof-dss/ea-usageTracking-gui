import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usage } from '../model/usage';
import { ApplicationEvent } from '../model/applicationEvent';
import { PaginatedReponse } from '../model/paginatedResponse';
import { environment } from '../../environments/environment';
import { Application, RegisterCommand } from '../model/application';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UsagePerUserService {
  private usagesUrl = environment.apiUri + 'Usage';
  private appsUrl = environment.apiUri + 'Usage/Apps';
  private allAppsUrl = environment.apiUri + 'Application/All';
  private registerAppUrl = environment.apiUri + 'Application/Register';
  private usagePerAppUrl = environment.apiUri + 'Usage/App';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsages(pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<Usage>> {
    return this.http
      .get<PaginatedReponse<Usage>>(this.usagesUrl, {
        params: new HttpParams()
          .set('PageNumber', pagenumber.toString())
          .set('PageSize', pagesize.toString()),
      })
      .pipe(map((res) => res));
  }

  registerApp(
    registerCommand: RegisterCommand
  ): Observable<RegisterCommand> {
    return this.http.post<RegisterCommand>(this.registerAppUrl, registerCommand);
  }

  getApps(pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<Application>> {
    return this.http
      .get<PaginatedReponse<Application>>(this.appsUrl, {
        params: new HttpParams()
          .set('PageNumber', pagenumber.toString())
          .set('PageSize', pagesize.toString()),
      })
      .pipe(map((res) => res));
  }

  getAllApps(pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<Application>> {
    return this.http
      .get<PaginatedReponse<Application>>(this.allAppsUrl, {
        params: new HttpParams()
          .set('PageNumber', pagenumber.toString())
          .set('PageSize', pagesize.toString()),
      })
      .pipe(map((res) => res));
  }

  getUsagesByApp(
    id: string,
    pagenumber = 1,
    pagesize = 3
  ): Observable<PaginatedReponse<Usage>> {
    return this.http
      .get<PaginatedReponse<Usage>>(this.usagePerAppUrl, {
        params: new HttpParams()
          .set('ApplicationId', id)
          .set('PageNumber', pagenumber.toString())
          .set('PageSize', pagesize.toString()),
      })
      .pipe(map((res) => res));
  }
}
