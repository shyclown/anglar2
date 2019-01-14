import {Component, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
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
        private theRouter: Router,
        private theRoute: ActivatedRoute
    ) {
        this.initService.setToken();
    }

    ngOnInit() {
        this.user = AuthService.getUser();
        if (!this.user){
            console.log(this.theRoute);
            //this.theRouter.navigate(["home"]);
        }
    }

}
