import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from "./login-form/login-form.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from "../directives/directives.module";
import { MatTabsModule } from "@angular/material";
import { MatCheckboxModule } from "@angular/material";


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
      MatTabsModule,
      MatCheckboxModule,
      //UserService,
  ],

  exports:[
      //MatCardModule,

      LoginFormComponent
  ],

  declarations: [

      LoginFormComponent
  ]
})
export class AuthModule { }
