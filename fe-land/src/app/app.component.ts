import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateFolderDialogModule} from "./_components/create-folder-dialog/create-folder-dialog.module";
import {CreateFolderDialogComponent} from "./_components/create-folder-dialog/create-folder-dialog.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

    constructor(public dialog: MatDialog) {

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
            width: '250px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
    }

  title = 'Landfield';
}
