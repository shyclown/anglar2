import { Component, OnInit } from '@angular/core';
import { ExplorerService } from "./service/explorer.service";
import {catchError, tap} from "rxjs/operators";
import {Folder} from "../folder";
import {InitService} from "./service/init.service";

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

  constructor(
      private ExplorerService: ExplorerService
  ) {




    this.data = ExplorerService;

    this.data.getsomething();
    this.data.explorerState.subscribe( data =>
    {
        this.currentState = data;
        this.folders = this.currentState.folders;
        this.currentFolderID = this.currentState.currentFolderID;
    });
  }
  ngOnInit() {}

}
