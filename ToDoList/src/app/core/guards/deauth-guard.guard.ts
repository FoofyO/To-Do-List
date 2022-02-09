import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';

@Injectable({
  providedIn: 'root'
})

export class DeauthGuard implements CanActivate {

  constructor(private accountFacade: AccountFacadeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.accountFacade.isAuthenticated()) {
      this.router.navigate(['/folder/list']);
      return false;
    }
    else {
      return true;
    }
  }
}