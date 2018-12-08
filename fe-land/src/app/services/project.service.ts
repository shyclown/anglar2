import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

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

    private project = new BehaviorSubject<Project>({});
    private projects = new BehaviorSubject<Project[]>([]);

    projectObservable = this.project.asObservable();
    projectsObservable = this.projects.asObservable();

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    index(): Observable<Project[]> {
        return this.http.get<Project[]>(
            `/api/project`
        ).pipe(
            tap(
                (projects: Project[]) => {
                    console.log('fetched projects', projects);
                    this.projects.next(projects)
                }
            ),
            catchError(this.handleError('index', []))
        );
    }

    show(project: Project): Observable<Project> {
        return this.http.get<Project>(
            `/api/project/${project.id}`
        ).pipe(
            tap(
                (project: Project)=> {
                    console.log('fetched project', project);
                    this.project.next(project)
                }
            ),
            catchError(this.handleError('show', []))
        )
    }

    create(project:Project): Observable<Project> {
        return this.http.post<Project>(
            `/api/project`,
            project
        ).pipe(
            tap(
                () => console.log('created project')
            ),
            catchError(this.handleError('create', []))
        );
    }

    update(project:Project): Observable<Project> {
        return this.http.put<Project>(
            `/api/project/${project.id}`,
            project
        ).pipe(
            tap(() => console.log('update project')),
            catchError(this.handleError('update', []))
        );
    }

}
