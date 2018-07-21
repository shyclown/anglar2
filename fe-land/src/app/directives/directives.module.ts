import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogOnClickDirective } from "./logonclick/log-on-click.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      LogOnClickDirective
  ],
  exports: [
      LogOnClickDirective
  ]
})
export class DirectivesModule { }
