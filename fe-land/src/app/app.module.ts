import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DataComponent } from "./connector/data/data.component";
import { AppRoutingModule }     from './app-routing/app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
/* Material UI */
import { MatToolbarModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { ExplorerModule } from "./views/explorer/explorer.module";
import { AuthModule } from "./auth/auth.module";
import { DirectivesModule} from "./directives/directives.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from './_components/card/card.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { LoginViewComponent } from "./views/login-view/login-view.component";
import { HomeViewComponent } from './views/home-view/home-view.component';
import { PublicViewComponent } from './views/public-view/public-view.component';

@NgModule({
  declarations: [
      AppComponent,
      DataComponent,
      UserMenuComponent,
      LoginViewComponent,
      HomeViewComponent,
      PublicViewComponent
  ],
  entryComponents: [
    //  LoginFormComponent
  ],

  imports: [
      AuthModule,
      CardModule,
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
