import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })
export class InitService {
    constructor( private http: HttpClient, private cookieService:CookieService ) {
        const csrfToken = this.cookieService.check('XSRF-TOKEN');
        if(!csrfToken){
            this.http.get<object>("/be-land/public/api", httpOptions).subscribe();
            window.location.reload();
        }
    }
}
