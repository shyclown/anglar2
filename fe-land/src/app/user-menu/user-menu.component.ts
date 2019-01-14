import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material"
import { AuthService }  from "../services/auth.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})

export class UserMenuComponent implements OnInit {

    @ViewChild(MatMenu) menu: MatMenu;

    constructor(
        private authService : AuthService
    ){}

    ngOnInit() {}

    clickProfile() : void { }
    clickItems() : void { }
    clickLogOut() : void { this.authService.logout(); }
    clickSettings() : void { }
}
