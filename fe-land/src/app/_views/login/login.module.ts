import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import {BrowserModule} from "@angular/platform-browser";
import {DirectivesModule} from "../../directives/directives.module";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

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
      MatButtonModule
  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent
  ]
})

export class LoginModule { }
