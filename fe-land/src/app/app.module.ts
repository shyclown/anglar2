import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { DataComponent } from "./connector/data/data.component";

import { AppRoutingModule }     from './app-routing/app-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';

/* Material UI */
import { MatToolbarModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { ExplorerModule} from "./views/explorer/explorer.module";
import { DirectivesModule} from "./directives/directives.module";
import { FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateFolderDialogModule } from './views/in-dialog/create-folder-dialog/create-folder-dialog.module';
import { CreateFolderDialogComponent } from "./views/in-dialog/create-folder-dialog/create-folder-dialog.component";

import { MatCardModule } from "@angular/material/card";
import { CardModule } from './_components/card/card.module';

import { InDialogComponent } from "./views/in-dialog/in-dialog.component"; //ADDED
import { InDialogModule } from "./views/in-dialog/in-dialog.module";
import {FolderTreeLineComponent} from "./views/explorer/folder-tree-line/folder-tree-line.component";
import {CreateFolderFormComponent} from "./views/explorer/create-folder-form/create-folder-form.component"; //ADDED



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DataComponent,
    BlogComponent,
    AboutComponent,
  ],
    entryComponents: [
      CreateFolderDialogComponent,
      InDialogComponent,
        FolderTreeLineComponent,
       // CreateFolderFormComponent
    ],

  imports: [
    CardModule,
    CreateFolderDialogModule,
    InDialogModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ExplorerModule,
    DirectivesModule,
    FormsModule,
    BrowserAnimationsModule,
  ],

  bootstrap: [ AppComponent ],

  schemas:[ NO_ERRORS_SCHEMA ],
})
export class AppModule {


}
