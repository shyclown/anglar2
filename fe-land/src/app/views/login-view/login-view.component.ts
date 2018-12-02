import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(
      public dialog: MatDialog
  ) {}

  @ViewChild('loginFormDialog') loginFormDialog: TemplateRef<any>;
  ngOnInit() {
    /*  */
    setTimeout(() => this.openLoginDialog(),100);
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
          console.log('The dialog was closed', result);

      });
  }

}
