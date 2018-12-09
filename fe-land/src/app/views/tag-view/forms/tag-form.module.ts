import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Component */
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/* Modules */
import { PanelModule } from "src/app/_components/panel.module";
import {
    MatButtonModule,
    MatDividerModule, MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
/* Services */
import { ProjectService } from "src/app/services/project.service";
/* API */
import { TokenInterceptor } from "src/app/interceptor/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagFormComponent } from "./tag-form.component";


@NgModule({
    declarations: [
        TagFormComponent
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
        ReactiveFormsModule, MatInputModule
    ],
    exports:[
        TagFormComponent
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class TagFormModule { }
