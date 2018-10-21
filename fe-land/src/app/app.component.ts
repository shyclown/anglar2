import {Component, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {LoginFormComponent} from "./auth/login-form/login-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

    cardClasses: { root : string };

    @ViewChild('inDialog') inDialog: TemplateRef<any>;
    @ViewChild('loginFormDialog') loginFormDialog: TemplateRef<LoginFormComponent>;

    constructor( public dialog: MatDialog ) {
        this.cardClasses = { root: 'rootStyle' }
    }

    openLoginDialog(): void {

        const dialogRef = this.dialog.open(
            this.loginFormDialog,
            {
                panelClass: 'customDialog',
                maxWidth: '250px',
                data: {}
            }
        );

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
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
