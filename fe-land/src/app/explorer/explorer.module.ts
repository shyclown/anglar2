import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material";
import { ExplorerComponent } from './explorer.component';
import { FolderTreeLineComponent } from './folder-tree-line/folder-tree-line.component';
import { BrowserModule } from "@angular/platform-browser";

import { ExplorerService } from "./service/explorer.service";

import { DirectivesModule } from "../directives/directives.module";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpXsrfInterceptor } from "../http-xsrfinterceptor";

@NgModule({
  imports: [
      BrowserModule,
      DirectivesModule,
      HttpClientModule,
      FormsModule,
      MatToolbarModule,
  ],
  exports:[
      ExplorerComponent,
      FolderTreeLineComponent,
  ],
  declarations: [

      ExplorerComponent,
      FolderTreeLineComponent
  ],
    providers:[
        ExplorerService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }
    ],
})
export class ExplorerModule { }
