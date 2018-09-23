import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from "@angular/material";

import  { CreateFolderDialogComponent }  from './create-folder-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,

  ],
  declarations: [
    CreateFolderDialogComponent
  ],
  exports: [
    CreateFolderDialogComponent
  ]
})

export class CreateFolderDialogModule{}
