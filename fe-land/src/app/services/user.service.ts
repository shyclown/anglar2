import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

/**/
/**/
export class User{
    id: number;
    name: string;
}

export class LogIn{
    email: string;
    password: string;
}
export class LogOut{

}

export class Register{
    _token: string;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

}

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
        )
};

const logInUrl = "/login";
const logOutUrl = "/logout";
const registerUrl = "/register";

const userDataUrl = "/api/user";

@Injectable({  providedIn: 'root' })
export default class UserService {

    constructor(
        private http: HttpClient
    )
    {

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

    public logOut = (data: LogOut): any => {
        return this.http.post<any>(
            logOutUrl,
            data,
            httpOptions
        ).pipe(
            tap((
                ) =>{
                    console.log(`User logged out!`);
                }
            ),
            catchError(this.handleError<LogOut>('LogOut'))
        );
    };

    public userData = (): any => {
        return this.http.get<any>(
            userDataUrl,
            httpOptions
        ).pipe(
            tap((r) =>{
                    console.log(`data = ${r}`);
                }
            ),
            catchError(this.handleError<LogIn>('LogIn'))
        )
    };

    public logIn = (data: LogIn): any => {
        return this.http.post<any>(
            logInUrl,
            data,
            httpOptions
        ).pipe(
            tap((
                ) =>{
                    console.log(`Logged in user with email = ${data.email}`);
                }
            ),
            catchError(this.handleError<LogIn>('LogIn'))
        );
    };

    public register = (data: Register): any => {
        return this.http.post<any>(
            registerUrl,
            data,
            httpOptions
        ).pipe(
            tap((
                ) =>{
                console.log(`Added user w/ id=${data.name}`);
             }
            ),
            catchError(this.handleError<Register>('Register'))
        );
    };


}
