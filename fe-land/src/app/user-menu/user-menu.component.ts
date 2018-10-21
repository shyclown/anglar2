import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material"

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})

export class UserMenuComponent implements OnInit {

    @ViewChild(MatMenu) menu: MatMenu;

    controllerName:string;

    constructor(){
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
        console.log(this.controllerName, 'clickLogOut',[event]);
    }
    clickSettings(event) : void {
        console.log(this.controllerName, 'clickSettings',[event]);
    }
}
