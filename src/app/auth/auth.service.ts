import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponsedata{
  kind : string;
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
    {email:email , password:password , returnSecureToken:true});
  };
}
