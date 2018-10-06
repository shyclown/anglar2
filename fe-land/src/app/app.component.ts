import {Component, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {CreateFolderDialogComponent} from "./views/in-dialog/create-folder-dialog/create-folder-dialog.component";
import {InDialogComponent } from "./views/in-dialog/in-dialog.component";
import {FolderTreeLineComponent} from "./views/explorer/folder-tree-line/folder-tree-line.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

    cardClasses: { root : string }

    @ViewChild('inDialog') inDialog: TemplateRef<any>;

    constructor( public dialog: MatDialog ) {
        this.cardClasses = { root: 'rootStyle' }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(
            this.inDialog, {
                panelClass: 'customDialog',
                maxWidth: '250px',

            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
    }

  title = 'Landfield';
}
