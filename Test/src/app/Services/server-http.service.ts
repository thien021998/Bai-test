import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError} from 'rxjs/operators'
import { User } from '../User/User';
@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  }
  private REST_API_SERVER = "https://reqres.in/api/users";

  constructor(private httpClient: HttpClient) { }

  public getAllUser():Observable<any> {
    const url = `${this.REST_API_SERVER}?page=2`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public PostUser(data: User):Observable<any> {
    const url = `${this.REST_API_SERVER}?page=2`;
    return this.httpClient
      .post<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public UpdateUser(id: number, data: User):Observable<any> {
    const url = `${this.REST_API_SERVER}?id=`+id;
    return this.httpClient
      .put<any>(url,data, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public DeleteUser(id: number):Observable<any> {
    const url = `${this.REST_API_SERVER}?id=`+id;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  public getUser(id: number):Observable<any> {
    const url = `${this.REST_API_SERVER}?id=`+id;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
