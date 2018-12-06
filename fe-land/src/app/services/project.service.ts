import {Injectable} from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

/**/
class Project{
    [key: string]: any
}

const httpOptions = {
    headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
    )
};

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private http: HttpClient
    ) {}

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    index(): Observable<Project[]> {
        return this.http.get<Project[]>(`/api/project`)
        .pipe(
            tap(() => console.log('fetched folders')),
            catchError(this.handleError('getFolders', []))
        );
    }

}
