import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

	public getMessageBoard(messageBoardName: string) : Promise<any>{
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url = './assets/messages/' + messageBoardName + '.JSN';
    let defaultURL = './assets/messages/SYSTEM.JSN';
    
    return this.http.get(url, { headers }).toPromise()
    .catch(e => {
      console.error("Could not find message board with name: " + url);
      return ({});
    })
  }

  /**
   * Function to handle error when the server return an error
   *
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  /**
   * Function to extract the data when the server return some
   *
   * @param res
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

}
