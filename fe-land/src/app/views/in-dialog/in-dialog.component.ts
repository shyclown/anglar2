import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FolderTreeLineComponent} from "../explorer/folder-tree-line/folder-tree-line.component";


/**
 * @title Injecting data when opening a dialog
 */
@Component({
    selector: 'in-dialog',
    templateUrl: 'in-dialog.component.html',
    styleUrls: ['in-dialog.component.scss'],
})
export class InDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<FolderTreeLineComponent>
    ) {
        console.log(dialogRef);
        console.log(FolderTreeLineComponent);

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

