import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usage } from '../model/usage';
import { PaginatedReponse } from '../model/paginatedResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  private usagesUrl = environment.apiUri + 'applicationUsage';

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
