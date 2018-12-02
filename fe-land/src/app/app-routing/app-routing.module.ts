import { NgModule } from '@angular/core';

import { RouterModule, Routes, CanActivate } from '@angular/router';

import {LoginViewComponent} from "../views/login-view/login-view.component";
import { ExplorerComponent } from "../views/explorer/explorer/explorer.component";

import { ResolveApi } from "../services/resolve-api";

import { AuthGuard } from "../guards/auth.guard";
import {HomeViewComponent} from "../views/home-view/home-view.component";


const routes : Routes =[
    {
        path: 'login',
        component: LoginViewComponent,
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeViewComponent,
        pathMatch: 'full',
        canActivate: [ AuthGuard ]
    },
    {
        path: 'explorer',
        component: ExplorerComponent ,
        canActivate: [ AuthGuard ]
        // resolve: { 'token': ResolveApi }
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ ResolveApi ]
})
export class AppRoutingModule {

}

