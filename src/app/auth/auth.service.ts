import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

  user = new Subject<User>();

  constructor(private http:HttpClient){}

  signup(email:string , password:string){
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkIHYXNHz7_QmkOqmAagzk1k4svFe6brA',
    {email:email , password:password , returnSecureToken:true})
    .pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expireIn
      );
    })
    );
  };

  login(email : string, password:string){
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkIHYXNHz7_QmkOqmAagzk1k4svFe6brA',
    {email:email , password:password , returnSecureToken:true})
    .pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expireIn
      );
    })
    );
  }

  private handleAuthentication(email:string ,localId:string, idToken:string , expireIn:number){
    const expirationdate = new Date(new Date().getTime() + +expireIn * 1000);
      const user = new User(
        email,
        localId,
        idToken,
        expirationdate
      );
      this.user.next(user);
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
