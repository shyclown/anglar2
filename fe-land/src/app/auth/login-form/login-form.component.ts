import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCard} from "@angular/material";
import UserService, { LogIn, Register } from "../../services/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    password: string;
    login: string;
    staySigned: boolean;


    loginData: LogIn;
    registerData: Register;

    constructor(
        private userService: UserService,

    ) {

    }

    logIn(){
        this.loginData = {
            email : this.login,
            password : this.password
        };


        this.userService.logIn( this.loginData ).subscribe((response)=>{
            console.log(response)
        });
        console.log('login', this)
    }

    signIn(){
        console.log('login', this)
    }

    ngOnInit() {
    }
/*
  @ViewChild(MatCard) menu: MatCard;
  constructor() { }

  ngOnInit() {
  }
*/
}
