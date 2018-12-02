import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from "./user-menu.component";

@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class UserMenuModule { }
