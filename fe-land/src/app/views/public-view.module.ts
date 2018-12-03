import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicViewComponent } from "./public-view/public-view.component";
import {
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule, MatToolbarModule,
} from "@angular/material";

import { MatCardModule } from '@angular/material';

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { PanelComponent } from "../_components/panel/panel.component";


@NgModule({
  declarations: [
      PublicViewComponent,
      PanelComponent,
  ],
  imports: [
      MatToolbarModule,
      CommonModule,
      MatCardModule,
      MatChipsModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatGridListModule,
      AngularFontAwesomeModule,
      MatDividerModule
  ],
  exports:[
      PublicViewComponent,
      PanelComponent
  ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicViewModule { }
