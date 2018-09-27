import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss']
})
export class CreateFolderDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateFolderDialogComponent>
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}