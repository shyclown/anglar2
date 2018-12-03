import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material";

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

    returnUrl: string;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialog
    ) { }

    loginUser() {
        this.loginData = {
            email : this.login,
            password : this.password
        };

        this.authService.login(
            this.loginData.email,
            this.loginData.password
        ).subscribe((response)=>{
            this.dialogRef.closeAll();
        });
    }

    registerUser() {
        console.log('login', this)
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log('URL: ',this.returnUrl);
    }
}
