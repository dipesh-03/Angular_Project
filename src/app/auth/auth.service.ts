import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponsedata{
  idToken : string;
  email : string;
  refreshToken : string;
  expireIn : string;
  localId : string;
  registered? : string
}

@Injectable({providedIn:'root'})
export class AuthService{
  constructor(private http:HttpClient){}

  signup(email:string , password:string){
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkIHYXNHz7_QmkOqmAagzk1k4svFe6brA',
    {email:email , password:password , returnSecureToken:true})
    .pipe(catchError(this.handleError));
  };

  login(email : string, password:string){
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkIHYXNHz7_QmkOqmAagzk1k4svFe6brA',
    {email:email , password:password , returnSecureToken:true})
    .pipe(catchError(this.handleError));
  }

  private handleError( errorRes : HttpErrorResponse){
    let errormessage = ' An Unknown Error Occurred'
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errormessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errormessage='This Email Already Exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errormessage='This Email Does Not Exist';
          break;
        case 'INVALID_PASSWORD':
          errormessage='This Password Is Not Correct'
          break;
      }
      return throwError(errormessage);
  }
}
