import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from "./user-menu.component";
import  UserService ,{LogOut} from "../services/user.service";

@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    UserService,
      LogOut,
    CommonModule,
    HttpClientModule
  ]
})
export class UserMenuModule { }
