import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private theAuthService : AuthService,
    private theRouter: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    //const user = this.theAuthService.decode();
/*
    if(user){
      if (user.role === next.data.role){
        return true;
      }
    }
*/
    this.theRouter.navigate(['/404']);

    return false;
  }

}
