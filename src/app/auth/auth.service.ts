import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponsedata{
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered? : string
}

@Injectable({providedIn:'root'})
export class AuthService{

  private TokenExiparationTime : any;

  user = new BehaviorSubject<User>(null);

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
        +resData.expiresIn
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
        +resData.expiresIn
      );
    })
    );
  }

  autoLogin(){
    const userData:{
      email : string ,
      id : string ,
      _token : string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.TokenExiparationTime){
      clearTimeout(this.TokenExiparationTime);
    }
    this.TokenExiparationTime = null;
  }

  autoLogout(expirationDuration : number){
    this.TokenExiparationTime = setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }

  private handleAuthentication(email:string ,localId:string, idToken:string , expiresIn:number){
    const expirationdate = new Date(new Date().getTime() + +expiresIn * 1000);
      const user = new User(
        email,
        localId,
        idToken,
        expirationdate
      );
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData',JSON.stringify(user));
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
