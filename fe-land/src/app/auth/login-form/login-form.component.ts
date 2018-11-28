import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCard} from "@angular/material";
import UserService, { LogIn, Register } from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

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
        private authService: AuthService

    ) {

    }

    logIn(){
        this.loginData = {
            email : this.login,
            password : this.password
        };

        this.authService.login(
            this.loginData.email,
            this.loginData.password
        ).subscribe((response)=>{
            console.log('login: ', response)
        });

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
