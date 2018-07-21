import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { SidenavComponent } from "../sidenav/sidenav.component";
import { HeaderComponent } from "../header/header.component";
import { BlogComponent } from "../blog/blog.component";
import { AboutComponent } from "../about/about.component";

import { ExplorerComponent } from "../explorer/explorer.component";
import {InitService} from "../explorer/service/init.service";
import {parseCookieValue} from "@angular/common/src/cookie";
import {ɵparseCookieValue} from "@angular/common";

const routes : Routes =[
    {path: '', redirectTo: '/side', pathMatch: 'full' },
    {path: 'header', component: HeaderComponent },
    {path: 'side', component: SidenavComponent },
    {path: 'blog', component: BlogComponent },
    {path: 'about', component: AboutComponent },
    {path: 'explorer', component: ExplorerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

    constructor( private InitService: InitService ){




    };
}

