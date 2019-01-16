import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ExplorerService } from "./../service/explorer.service";
import {catchError, tap} from "rxjs/operators";
import {Folder} from "../../../folder";
import {InitService} from "../service/init.service";
import {MatDialog} from "@angular/material";

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
      private ExplorerService: ExplorerService,
        public dialog: MatDialog
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

    @ViewChild('createFolderDialog')
    createFolderDialog: TemplateRef<any>;

    saveNewFolder =(name)=>{  this.data.saveNewFolder(name); }

    openCreateFolderDialog(): void {
        const dialogRef = this.dialog.open(
            this.createFolderDialog,
            {
                panelClass: 'customDialog',
                maxWidth: '250px',
                data: {},
                disableClose: false,
                closeOnNavigation: true
            }
        );
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }
    /*
    deleteFolder = (folder)=>{ this.data.deleteFolder(name);}
    */
    ngOnInit() {
        /*this.data.getsomething();*/
    }

}
