import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatDialogModule } from "@angular/material";
import { InDialogComponent }  from './in-dialog.component';

import { ExplorerModule} from "../explorer/explorer.module";


@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        ExplorerModule

    ],

    declarations: [

        InDialogComponent,

    ],

    exports: [
        InDialogComponent,
    ]
})

export class InDialogModule{}
