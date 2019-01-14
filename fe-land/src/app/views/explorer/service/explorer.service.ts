import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, subscribeOn, tap} from "rxjs/operators";

import {Observable} from "rxjs/internal/Observable";
import {CookieService} from "ngx-cookie-service";
import {InitService} from "./init.service";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};

class Folder{
    name:string;
    id: number;
    parent_folder_id: number;
    created_at: string;
    updated_at: string;
}

class Folders{
    folders : Array<Folder>;
}

@Injectable({ providedIn: 'root' })

export class ExplorerService {

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        private api: InitService,
    ) {
        this.getFolders();
    }



    private explorerData = new BehaviorSubject<Folders>({
        folders: [],
    });

    public folders = new BehaviorSubject<Folders>(
        { folders: [] }
    );

    public getFolders = (): void => {
        this.http.get(this.api.API+"/folder", httpOptions )
        .subscribe(
            ( response : Array<Folder> )=>{
                this.folders.next(  { folders: response } )
            },
            (): void =>{  } ,
            (): void =>{  }
        )
    };

    public getFolder = (folderId) => {
        this.http.get( this.api.API+"/folder/"+folderId, httpOptions)
        .subscribe(
            (response: Folder)=>{
                return response;
            }
        )
    };

    public createFolder = () => {

    };

    public saveNewFolder = (name) => {

      this.http.post( this.api.API+"/save_folder",
          { 'name' :  name },httpOptions).subscribe((data)=>{
                this.getFolders();
          });

    };


    explorerState = this.explorerData.asObservable();

    setCurrentData( value: any ){ this.explorerData.next( value ); }


}
