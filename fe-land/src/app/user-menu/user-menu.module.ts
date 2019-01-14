import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from "./user-menu.component";
import {MatMenuModule} from "@angular/material";

@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatMenuModule,
  ]
})
export class UserMenuModule { }
