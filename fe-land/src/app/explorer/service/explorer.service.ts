import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, subscribeOn, tap} from "rxjs/operators";
import {Folder} from "../../folder";
import {Observable} from "rxjs/internal/Observable";
import {CookieService} from "ngx-cookie-service";
import {InitService} from "./init.service";



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })
export class ExplorerService {

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        private api: InitService
    ) { }

  private explorerData = new BehaviorSubject<any>({
    currentFolderID: 0,
    folders: [
      { id: 1, name: 'folder1', parent: 0 },
      { id: 2, name: 'folder2', parent: 0 },
      { id: 3, name: 'folder3', parent: 1 },
      { id: 4, name: 'folder4', parent: 1 },
      { id: 5, name: 'folder5', parent: 1 },
      { id: 6, name: 'folder6', parent: 2 },
      { id: 7, name: 'folder7', parent: 2 }
    ]
  });

  public saveNewFolder = (name) => {
      console.log(this.api);

      this.http.post( this.api.API+"/save_folder",
          { 'name' :  name },httpOptions).subscribe((data)=>{
          console.log(data);
      });
      this.http.post( this.api.API+"/mock", [], httpOptions).subscribe((data)=>{
          console.log(data);
      });
  }

  
  explorerState = this.explorerData.asObservable();

  setCurrentData( value: any ){ this.explorerData.next( value ); }


}
