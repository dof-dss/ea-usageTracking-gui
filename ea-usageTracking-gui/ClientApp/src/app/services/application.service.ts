import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Applications } from '../model/application';
import { Application } from '../model/application';
import { PaginatedReponse } from '../model/paginatedResponse';
import { CreateAuditApplicationCommand } from '../model/application';
import { Guid } from "guid-typescript";


import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root'})
export class ApplicationService {

  private applicationsUrl = environment.apiUri + 'applications';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

    /** GET applications from the server */
  getApplications (pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<Application>> {
      return this.http.get<PaginatedReponse<Application>>(this.applicationsUrl, {
                                                  params: new HttpParams()
                                                  .set('PageNumber',pagenumber.toString())
                                                  .set('PageSize',pagesize.toString())
      }).pipe(map(res => res), tap(a => console.log(a)));
  }


  getApplication(id: number): Observable<Application> {
    const url = `${this.applicationsUrl}/${id}`;
    return this.http.get<Application>(url).pipe(
      tap(_ => { const outcome = _ ? `fetched` : `did not find`;
        //this.log(`fetched Application id=${id}`)
    }),
      catchError(this.handleError<Application>(`getApplication id=${id}`))
    );
  }

  /* GET Application whose name contains search term */
  searchApplications(term: string): Observable<Application> {
    if (!term.trim()) {
      // if not search term, return empty Application array.
      return of();
    }
    return this.http.get<Application>(`${this.applicationsUrl}/?name=${term}`);
  }

  insertApplication(application: CreateAuditApplicationCommand) {  
    console.log("In insertApplication");  

    const headers = { 'x-requestid': Guid.create().toString() }
    this.http.post<any>(`${this.applicationsUrl}/`, application, { headers }).subscribe(data => {
        console.log("DATA ID -" + data);
    });
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


