import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponsedata{
  idToken : string;
  email : string;
  refreshToken : string;
  expireIn : string;
  localId : string;
}

@Injectable({providedIn:'root'})
export class AuthService{
  constructor(private http:HttpClient){}

  signup(email:string , password:string){
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkIHYXNHz7_QmkOqmAagzk1k4svFe6brA',
    {email:email , password:password , returnSecureToken:true})
    .pipe(catchError(errorRes =>{
      let errormessage = ' An Error Occurred'
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errormessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errormessage='This Email Already Exists';
      }
      return throwError(errormessage);
    }));
  };
}
