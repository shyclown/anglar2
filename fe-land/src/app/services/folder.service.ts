import {Injectable} from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

/**/
class Folder{
    name:string;
    id: number;
    parent_folder_id: number;
    created_at: string;
    updated_at: string;
}



const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api/";

@Injectable({
    providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) {

  }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getFolders (): Observable<Folder[]> {
        return this.http.get<Folder[]>(apiUrl).pipe(
            tap(() => console.log('fetched folders')),
            catchError(this.handleError('getFolders', []))
        );
    }

    getFolder(id: number): Observable<Folder> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Folder>(url).pipe(
            tap(() => console.log(`fetched folder id=${id}`)),
            catchError(this.handleError<Folder>(`getFolder id=${id}`))
        );
    }

    addFolder (folder): Observable<Folder> {
        return this.http.post<Folder>(apiUrl, folder, httpOptions).pipe(
            tap((folder: Folder) => console.log(`added folder w/ id=${folder.id}`)),
            catchError(this.handleError<Folder>('addFolder'))
        );
    }

    updateFolder (id, folder): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, folder, httpOptions).pipe(
            tap(() => console.log(`updated folder id=${id}`)),
            catchError(this.handleError<any>('updateFolder'))
        );
    }

    deleteFolder (id): Observable<Folder> {
        const url = `${apiUrl}/${id}`;

        return this.http.delete<Folder>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted folder id=${id}`)),
            catchError(this.handleError<Folder>('deleteFolder'))
        );
    }
}
