import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ChipInputComponent } from "./chip-input.component";
import {
    MatChipsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatIconModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        ChipInputComponent
    ],
    imports: [
        CommonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        HttpClientModule,
        MatOptionModule,
        MatIconModule,
        ReactiveFormsModule
    ],
    exports: [
        ChipInputComponent
    ]
})
export class ChipInputModule { }