import { NgModule } from '@angular/core';

import { RouterModule, Routes, CanActivate } from '@angular/router';

import { SidenavComponent } from "../sidenav/sidenav.component";
import { HeaderComponent } from "../header/header.component";
import { BlogComponent } from "../blog/blog.component";
import { AboutComponent } from "../about/about.component";

import { ExplorerComponent } from "../views/explorer/explorer/explorer.component";

import { ResolveApi } from "../services/resolve-api";

import { AuthGuard } from "../guards/auth.guard";

const routes : Routes =[
    {
        path: '',
        redirectTo: '/side',
        pathMatch: 'full',
        data: {
            role: 'admin'
        }
    },
    {
        path: 'header',
        component: HeaderComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'side',
        component: SidenavComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    /* Resolve API before loading route */
    {path: 'explorer', component: ExplorerComponent , resolve: { 'token': ResolveApi } }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ ResolveApi ]
})
export class AppRoutingModule {

}

