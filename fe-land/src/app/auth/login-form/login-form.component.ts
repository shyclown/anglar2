import { Component, OnInit } from '@angular/core';
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
    loginData: {
        email: string,
        password: string
    };

    constructor(
        private authService: AuthService
    ) { }

    loginUser()
    {
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

    registerUser(){
        console.log('login', this)
    }

    ngOnInit() {
    }
}
