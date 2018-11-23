import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private theRoute: Router
    ) {}

    login(login: string, password: string){
        return this.http.post<any>(`api/user/auth`, { login, password })
            .pipe( map( user => {
                if (user && user.token) {
                  localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }))
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.theRoute.navigate(["login"]);
    }

    isAuthenticated(){
        return true;
    }

    sendToken(token: string) {
        localStorage.setItem("LoggedInUser", token)
    }

    getToken() {
        return localStorage.getItem("LoggedInUser")
    }

    isLoggednIn() {
        return this.getToken() !== null;
    }


}