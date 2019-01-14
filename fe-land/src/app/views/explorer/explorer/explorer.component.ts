import { Component, OnInit } from '@angular/core';
import { ExplorerService } from "./../service/explorer.service";
import {catchError, tap} from "rxjs/operators";
import {Folder} from "../../../folder";
import {InitService} from "../service/init.service";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

    folders: any;
    currentState: any;
    data: ExplorerService;
    currentFolderID: number;
    selected:boolean;

    name:string;

  constructor(
      private ExplorerService: ExplorerService
  ) {
    this.selected = false;
    this.data = ExplorerService;
    this.folders = this.data.folders;

    this.data.explorerState.subscribe( data =>
    {
        this.currentState = data;
       // this.folders = this.currentState.folders;
        this.currentFolderID = this.currentState.currentFolderID;
    });
  }
    saveNewFolder =(name)=>{  this.data.saveNewFolder(name); }
    /*
    deleteFolder = (folder)=>{ this.data.deleteFolder(name);}
    */
    ngOnInit() {
        /*this.data.getsomething();*/
    }

}
