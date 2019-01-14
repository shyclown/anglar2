import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Component */
import { ProjectViewComponent } from './project-view/project-view.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/* Modules */
import { PanelModule } from "../../_components/panel.module";
import {
    MatButtonModule,
    MatDividerModule, MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule, MatChipsModule,
} from "@angular/material";
/* Services */
import { ProjectService } from "../../services/project.service";
/* API */
import { TokenInterceptor } from "../../interceptor/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChipInputModule } from "../../components/chip-input/chip-input.module";

import { ProjectManagerViewComponent } from './project-manager-view/project-manager-view.component';
import { TagService } from "src/app/services/tag.service";


@NgModule({
    declarations: [
        ProjectViewComponent,
        ProjectManagerViewComponent
    ],
    providers:[
        ProjectService,
        TagService,
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
        MatChipsModule,
        MatIconModule,
        MatCardModule
    ],
    exports:[
        ProjectViewComponent,
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProjectViewModule { }
