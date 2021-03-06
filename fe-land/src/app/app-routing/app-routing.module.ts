import { NgModule } from '@angular/core';

import { RouterModule, Routes, CanActivate } from '@angular/router';

import { LoginViewComponent } from "../views/login-view/login-view.component";
import { ExplorerComponent } from "../views/explorer/explorer/explorer.component";

import { ResolveApi } from "../services/resolve-api";

import { AuthGuard } from "../guards/auth.guard";
import { HomeViewComponent } from "../views/home-view/home-view.component";
import { PublicViewComponent } from "../views/public-view/public-view.component";


import { ProjectViewComponent } from "../views/project/project-view/project-view.component";
import {ProjectManagerViewComponent} from "../views/project/project-manager-view/project-manager-view.component";
import { TagViewComponent} from "../views/tag/tag-view.component";


const routes : Routes =[
    {
        path: '',
        component: PublicViewComponent,
       // pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginViewComponent,
       // pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeViewComponent,
       // pathMatch: 'full',
        canActivate: [ AuthGuard ]
    },
    {
        path: 'explorer',
        component: ExplorerComponent ,
        canActivate: [ AuthGuard ]
        // resolve: { 'token': ResolveApi }
    },
    {
        path: 'project',
        component: ProjectViewComponent ,
        canActivate: [ AuthGuard ]
        // resolve: { 'token': ResolveApi }
    },
    {
        path: 'tag/:id',
        component: TagViewComponent ,
        canActivate: [ AuthGuard ]
        // resolve: { 'token': ResolveApi }
    },
    {
        path: 'project/:id',
        component: ProjectManagerViewComponent ,
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

