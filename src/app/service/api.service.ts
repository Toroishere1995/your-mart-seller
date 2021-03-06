import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
  
  post(path: string, body: Object = {}): Observable<any> {
    console.log(body)
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body['user'])
    ).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body['user'])
    ).pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    console.log(`${environment.api_url}${path}`);
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    
    return this.http.delete(`${environment.api_url}${path}`)
    .pipe(catchError(this.formatErrors));
  }
}
