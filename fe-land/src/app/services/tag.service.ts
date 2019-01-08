import { Injectable} from "@angular/core";
import { BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

class Tag{
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
export class TagService {

    constructor(
        private http: HttpClient
    ) {}

    private tag = new BehaviorSubject<Tag>({});
    private tags = new BehaviorSubject<Tag[]>([]);

    tagObservable = this.tag.asObservable();
    tagsObservable = this.tags.asObservable();

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    index(): Observable<Tag[]> {
        return this.http.get<Tag[]>(
            `/api/tag`
        ).pipe(
            tap(
                (tags: Tag[]) => {
                    console.log('fetched tags', tags);
                    this.tags.next(tags)
                }
            ),
            catchError(this.handleError('index', []))
        );
    }

    show(tag: Tag): Observable<Tag> {
        return this.http.get<Tag>(
            `/api/tag/${tag.id}`
        ).pipe(
            tap(
                (tag: Tag)=> {
                    console.log('fetched tag', tag);
                    this.tag.next(tag)
                }
            ),
            catchError(this.handleError('show', []))
        )
    }

    create(tag:Tag): Observable<Tag> {
        return this.http.post<Tag>(
            `/api/tag`,
            tag
        ).pipe(
            tap(
                () => console.log('created tag')
            ),
            catchError(this.handleError('create', []))
        );
    }

    update(tag:Tag): Observable<Tag> {
        return this.http.put<Tag>(
            `/api/tag/${tag.id}`,
            tag
        ).pipe(
            tap(() => console.log('update tag')),
            catchError(this.handleError('update', []))
        );
    }

}
