import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import {ExplorerModule} from "./explorer/explorer.module";
import {DirectivesModule} from "./directives/directives.module";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateFolderDialogModule } from './_components/create-folder-dialog/create-folder-dialog.module';
import {CreateFolderDialogComponent} from "./_components/create-folder-dialog/create-folder-dialog.component";


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
      CreateFolderDialogComponent
    ],

  imports: [
    CreateFolderDialogModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {


}
