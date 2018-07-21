import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import {Folder} from "./folder";


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })

export class FolderService {

    foldersUrl: string;

  constructor(
      private http: HttpClient

  ) { }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


    addFolder (folder: Folder): Observable<Folder> {
        return this.http.post<Folder>(this.foldersUrl, folder, httpOptions).pipe(
            tap((folder: Folder)=> console.log(`deleted hero id=${folder.id}`)),
            catchError(
                this.handleError('addFolder', folder))
            );
    }

}
