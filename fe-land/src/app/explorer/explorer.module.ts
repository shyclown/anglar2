import { NgModule } from '@angular/core';
import { ExplorerComponent } from './explorer.component';
import { FolderTreeLineComponent } from './folder-tree-line/folder-tree-line.component';
import { BrowserModule } from "@angular/platform-browser";

import { ExplorerService } from "./service/explorer.service";

import { DirectivesModule } from "../directives/directives.module";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";


@NgModule({
  imports: [
      BrowserModule,
      DirectivesModule,
      HttpClientModule,
  ],
  exports:[
      ExplorerComponent,
      FolderTreeLineComponent,
  ],
  declarations: [

      ExplorerComponent,
      FolderTreeLineComponent
  ],
    providers:[ ExplorerService, CookieService ],
    bootstrap: [ ExplorerComponent ]
})
export class ExplorerModule { }
