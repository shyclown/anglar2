import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, subscribeOn, tap} from "rxjs/operators";
//import {Folder} from "../../folder";
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
    folders:Array<Folder>;
}

@Injectable({ providedIn: 'root' })

export class ExplorerService {

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        private api: InitService
    ) {
        this.getFolders();
    }

    private explorerData = new BehaviorSubject<any>({
    currentFolderID: 0,
    folders: [],
    });

    public folders = new BehaviorSubject<Folders>(
        { folders: [] }
    );

    public getFolders = () => {
        this.http.post(this.api.API+"/mock",[],httpOptions).subscribe(
            (response : Folders)=>{
                this.folders.next( response );
            },()=>{} ,()=>{ console.log(this.folders.value);
            }
        )
    };

    public saveNewFolder = (name) => {
      console.log(this.api);

      this.http.post( this.api.API+"/save_folder",
          { 'name' :  name },httpOptions).subscribe((data)=>{
                this.getFolders();
          });

    };


    explorerState = this.explorerData.asObservable();

    setCurrentData( value: any ){ this.explorerData.next( value ); }


}
