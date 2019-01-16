import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Material*/
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule, MatInputModule, MatListModule} from '@angular/material';

import { CreateFolderFormComponent } from './create-folder-form/create-folder-form.component';

import { MatToolbarModule } from "@angular/material";
import { ExplorerComponent } from './explorer/explorer.component';
import { FolderTreeLineComponent } from './folder-tree-line/folder-tree-line.component';
import { BrowserModule } from "@angular/platform-browser";

import { ExplorerService } from "./service/explorer.service";

import { DirectivesModule } from "../../directives/directives.module";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpXsrfInterceptor} from "../../http-xsrfinterceptor";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    BrowserModule,
    DirectivesModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatListModule,
      MatIconModule

  ],
    exports:[
        ExplorerComponent,
        FolderTreeLineComponent,
        CreateFolderFormComponent,
    ],
    declarations: [
        ExplorerComponent,
        FolderTreeLineComponent,
        CreateFolderFormComponent,
    ],
    providers:[
        ExplorerService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }
    ],

})
export class ExplorerModule { }
