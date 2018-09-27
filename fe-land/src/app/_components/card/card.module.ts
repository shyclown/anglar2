import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { CardComponent } from "./card.component";

console.log(CardComponent);

@NgModule({
  imports: [
    CommonModule, BrowserModule
  ],
  declarations: [ CardComponent ],
  exports: [ CardComponent ]
})

export class CardModule { }
