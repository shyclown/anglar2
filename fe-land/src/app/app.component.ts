import {Component, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

    user:{};
    title = 'Landfield';

    constructor() {
        this.user = AuthService.getUser().user;
        console.log(this.user);
    }

    ngOnInit() {

    }

}
