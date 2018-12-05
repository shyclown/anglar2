import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectViewComponent } from './project-view/project-view.component';
import {PanelModule} from "../_components/panel.module";
import {PanelComponent} from "../_components/panel/panel.component";
import {MatListModule, MatToolbarModule} from "@angular/material";




@NgModule({
  declarations: [
      ProjectViewComponent,
  ],

  imports: [
      PanelModule,
      CommonModule,
      MatToolbarModule,
      MatListModule
  ],
  exports:[
      ProjectViewComponent,
  ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectViewModule { }
