import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material"
import { AuthService }  from "../services/auth.service";
import {ExplorerService} from "../views/explorer/service/explorer.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})

export class UserMenuComponent implements OnInit {

    @ViewChild(MatMenu) menu: MatMenu;

    controllerName:string;



    constructor(
        private authService : AuthService
    ){
        this.controllerName = 'userMenu';
    }

    ngOnInit() {

    }

    clickProfile(event) : void {
        console.log(this.controllerName, 'clickProfile',[event]);
    }
    clickItems(event) : void {


        console.log(this.controllerName, 'clickItems',[event]);
    }
    clickLogOut(event) : void {
        console.log(this.controllerName, 'clickItems',[event]);
        this.authService.logout();
    }
    clickSettings(event) : void {
        console.log(this.controllerName, 'clickSettings',[event]);
    }
}
