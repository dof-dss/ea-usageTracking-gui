import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usage } from '../model/usage';
import { ApplicationEvent } from '../model/applicationEvent';
import { PaginatedReponse } from '../model/paginatedResponse';
import { environment } from '../../environments/environment';
import { Application } from '../model/application';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsageService {

  private usagesUrl = environment.apiUri + 'ApplicationUsage';
  private eventsUrl = environment.apiUri + 'ApplicationEvent';
  private eventDetailsUrl = environment.apiUri + 'ApplicationEvent/Details';
  private applicationUrl = environment.apiUri + 'Application';
  private usersUrl = environment.apiUri + 'ApplicationUser';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

  getUsages(pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<Usage>> {
      return this.http.get<PaginatedReponse<Usage>>(this.usagesUrl, {
                                                  params: new HttpParams()
                                                  .set('PageNumber', pagenumber.toString())
                                                  .set('PageSize', pagesize.toString())
      }).pipe(map(res => res));
  }

  getEvents(pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<ApplicationEvent>> {
      return this.http.get<PaginatedReponse<ApplicationEvent>>(this.eventsUrl, {
                                                  params: new HttpParams()
                                                  .set('PageNumber', pagenumber.toString())
                                                  .set('PageSize', pagesize.toString())
      }).pipe(map(res => res));
  }

  getEvent(id): Observable<ApplicationEvent> {
    return this.http.get<ApplicationEvent>(this.eventDetailsUrl, {
                                                params: new HttpParams()
                                                .set('Id', id.toString())
    });
}

updateEvent(applicationEvent: ApplicationEvent): Observable<ApplicationEvent> {
  return this.http.put<ApplicationEvent>(this.eventsUrl, applicationEvent);
}

deleteEvent(applicationEvent: ApplicationEvent): Observable<ApplicationEvent> {
  return this.http.delete<ApplicationEvent>(this.eventsUrl + '/' + applicationEvent.id);
}

  getUsers(pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<User>> {
    return this.http.get<PaginatedReponse<User>>(this.usersUrl, {
                                                params: new HttpParams()
                                                .set('PageNumber', pagenumber.toString())
                                                .set('PageSize', pagesize.toString())
    }).pipe(map(res => res));
}

  getApplication(): Observable<Application> {
      return this.http.get<Application>(this.applicationUrl);
  }

  getUsage(id: number): Observable<Usage> {
    const url = `${this.usagesUrl}/${id}`;
    return this.http.get<Usage>(url).pipe(
      tap(_ => { const outcome = _ ? `fetched` : `did not find`;
        //this.log(`fetched Audit id=${id}`)
    }),
      catchError(this.handleError<Usage>(`getAudit id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
