import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Audit } from '../model/audit';
import { PaginatedReponse } from '../model/paginatedResponse';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root'})
export class AuditService {

  private auditsUrl = environment.apiUri + 'audits';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

    /** GET audits from the server */
  getAudits (pagenumber = 1, pagesize = 3): Observable<PaginatedReponse<Audit>> {
      return this.http.get<PaginatedReponse<Audit>>(this.auditsUrl, {
                                                  params: new HttpParams()
                                                  .set('PageNumber',pagenumber.toString())
                                                  .set('PageSize',pagesize.toString())
      }).pipe(map(res => res));
  }


  getAudit(id: number): Observable<Audit> {
    const url = `${this.auditsUrl}/${id}`;
    return this.http.get<Audit>(url).pipe(
      tap(_ => { const outcome = _ ? `fetched` : `did not find`;
        //this.log(`fetched Audit id=${id}`)
    }),
      catchError(this.handleError<Audit>(`getAudit id=${id}`))
    );
  }

  /* GET Audits whose name contains search term */
  searchAudits(term: string): Observable<Audit> {
    if (!term.trim()) {
      // if not search term, return empty Audit array.
      return of();
    }
    return this.http.get<Audit>(`${this.auditsUrl}/?name=${term}`);
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

