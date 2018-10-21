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
import { MatCardModule } from "@angular/material";

import { MatToolbarModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { ExplorerModule} from "./views/explorer/explorer.module";
import { DirectivesModule} from "./directives/directives.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateFolderDialogModule } from './views/in-dialog/create-folder-dialog/create-folder-dialog.module';

import { CardModule } from './_components/card/card.module';
import { InDialogModule } from "./views/in-dialog/in-dialog.module";
import { LoginComponent } from './_views/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SignInFormComponent } from './auth/sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DataComponent,
    BlogComponent,
    AboutComponent,
    LoginComponent,
    UserMenuComponent,
    LoginFormComponent,
    SignInFormComponent,
  ],
  entryComponents: [
  ],

  imports: [
    CardModule,
    MatCardModule,
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
    MatMenuModule,
    MatListModule
  ],

  bootstrap: [ AppComponent ],

  schemas:[ NO_ERRORS_SCHEMA ],
})
export class AppModule {


}
