import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Component */
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
import { TagService } from "src/app/services/tag.service";

/* API */
import { TokenInterceptor } from "../../interceptor/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChipInputModule } from "src/app/components/chip-input/chip-input.module";

import { TagViewComponent } from "./tag-view.component";


@NgModule({
    declarations: [
        TagViewComponent
    ],
    providers:[
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
        TagViewComponent,
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class TagViewModule { }
