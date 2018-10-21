import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInFormComponent} from "./sign-in-form/sign-in-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";

@NgModule({
  imports: [
    CommonModule
  ],

  exports:[
      SignInFormComponent,
      LoginFormComponent
  ],

  declarations: [
      SignInFormComponent,
      LoginFormComponent
  ]
})
export class AuthModule { }
