import {Component, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {InitService} from "./services/init.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

    user:{};
    title = 'Landfield';

    constructor(
        private initService: InitService,
        private theRoute: Router
    ) {
        /* to receive token */
        this.initService.setToken();
    }

    ngOnInit() {
        this.user = AuthService.getUser();
        if(!this.user){
            this.theRoute.navigate(["login"]);
        }
    }

}
