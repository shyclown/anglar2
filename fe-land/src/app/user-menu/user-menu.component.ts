import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material"
import  UserService, { LogOut }  from "../services/user.service";
import {ExplorerService} from "../views/explorer/service/explorer.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})

export class UserMenuComponent implements OnInit {

    @ViewChild(MatMenu) menu: MatMenu;

    controllerName:string;
    logOutData: LogOut;


    constructor(
        private userService : UserService
    ){
        //this.userService = UserService;
        this.controllerName = 'userMenu';

        console.log(this.userService)
    }

    ngOnInit() {

    }

    clickProfile(event) : void {
        console.log(this.controllerName, 'clickProfile',[event]);
    }
    clickItems(event) : void {
        console.log('requesting');
        this.userService.logOut(this.logOutData).subscribe((r)=>
            console.log(r)
        );

        console.log(this.controllerName, 'clickItems',[event]);
    }
    clickLogOut(event) : void {
        console.log(this.controllerName, 'clickLogOut',[event]);
    }
    clickSettings(event) : void {
        console.log(this.controllerName, 'clickSettings',[event]);
    }
}
