import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Component */
import { ProjectViewComponent } from './project-view/project-view.component';
import { CreateProjectFormComponent } from "./project-view/forms/create-project-form.component";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

/* Modules */
import { PanelModule } from "../_components/panel.module";
import {
    MatButtonModule,
    MatDividerModule, MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
/* Services */
import { ProjectService } from "../services/project.service";
/* API */
import { TokenInterceptor } from "../interceptor/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChipInputModule } from "../components/chip-input/chip-input.module";


@NgModule({
    declarations: [
        ProjectViewComponent,
        CreateProjectFormComponent
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
        MatDividerModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatSidenavModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        ChipInputModule,
    ],
    exports:[
        ProjectViewComponent,
        CreateProjectFormComponent
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProjectViewModule { }
