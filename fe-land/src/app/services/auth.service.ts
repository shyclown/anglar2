import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

import {Observable, BehaviorSubject, of} from "rxjs";

import { User } from '../_models/user.model';

import { HttpHeaders } from "@angular/common/http";


const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    )
};

// import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private theRoute: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('currentUser'))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    private handleError<T> (operation = 'operation', result?: T)
    {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(operation, error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    login( email: string, password: string ){
        return this.http.post<any>(`/login`, { email, password })
            .pipe(
                tap(()=>{ console.log('trying log in...')}),
                map( user => {
                if (user && user.token) {
                    AuthService.removeUser();
                    AuthService.setUser(user)
                }
                return user;
                }),
                catchError(this.handleError<any>('Login: Could not log in!'))
            )


    }

    logout(){
        this.http.get( `/logout`).subscribe(
            () => {
                console.log(`User logged out!`);
                AuthService.removeUser();
                this.theRoute.navigate(["login"]);
                return {};
            }
        );

    };

    static isAuthenticated(){
        return AuthService.getUser() !== null
    }
    static removeUser(){
        localStorage.removeItem("loggedInUser")
    }
    static setUser(user: string) {
        localStorage.setItem("loggedInUser", JSON.stringify(user))
    }
    static getUser(){
        return JSON.parse(localStorage.getItem("loggedInUser"))
    }
    static getToken() {
        return AuthService.getUser().token
    }



}