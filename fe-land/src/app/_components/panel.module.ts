import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from "./panel/panel.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


@NgModule({
  imports: [
      CommonModule,
  ],

  exports:[
      PanelComponent
  ],

  declarations: [
      PanelComponent
  ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PanelModule { }
