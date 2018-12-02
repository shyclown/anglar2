import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { DataComponent } from "./connector/data/data.component";

import { AppRoutingModule }     from './app-routing/app-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';


/* Material UI */
import { MatCardModule } from "@angular/material";

import { MatToolbarModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";

import { ExplorerModule } from "./views/explorer/explorer.module";
import { AuthModule } from "./auth/auth.module";


import { DirectivesModule} from "./directives/directives.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { CreateFolderDialogModule } from './views/in-dialog/create-folder-dialog/create-folder-dialog.module';

import { CardModule } from './_components/card/card.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { UserMenuComponent } from './user-menu/user-menu.component';

import {LoginViewComponent} from "./views/login-view/login-view.component";
import { HomeViewComponent } from './views/home-view/home-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    UserMenuComponent,
      LoginViewComponent,
      HomeViewComponent
  ],
  entryComponents: [
    //  LoginFormComponent
  ],

  imports: [
     AuthModule,
    CardModule,
   // MatCardModule,
   // CreateFolderDialogModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ExplorerModule,
      AuthModule,

    DirectivesModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatListModule
  ],

  bootstrap: [ AppComponent ],

  schemas:[ NO_ERRORS_SCHEMA ],
})
export class AppModule {


}
