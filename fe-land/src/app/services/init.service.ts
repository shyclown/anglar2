import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};



@Injectable({ providedIn: 'root' })
export class InitService {

    public API : string;

    constructor( private http: HttpClient, private cookieService:CookieService ) {
        /*const csrfToken = this.cookieService.check('XSRF-TOKEN');*/
        this.API = '';//http://landfield.localhost';
    }



    public setToken(){
        console.log(this.API);
        return this.http.get<any>(this.API + "/api", httpOptions);
    }
}
