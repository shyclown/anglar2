import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Component */
import { ProjectViewComponent } from './project-view/project-view.component';
/* Modules */
import { PanelModule } from "../_components/panel.module";
import {
    MatDividerModule,
    MatListModule,
    MatToolbarModule
} from "@angular/material";
/* Services */
import { ProjectService } from "../services/project.service";
/* API */
import {TokenInterceptor} from "../interceptor/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
    declarations: [
      ProjectViewComponent,
    ],
    providers:[
      ProjectService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    imports: [
      PanelModule,
      CommonModule,
      MatToolbarModule,
      MatListModule,
        MatDividerModule
    ],
    exports:[
      ProjectViewComponent,
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProjectViewModule { }
