import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent
  ]
})

export class LoginModule { }
