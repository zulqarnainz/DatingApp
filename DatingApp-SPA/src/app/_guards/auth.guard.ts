import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }


  constructor(private authService: AuthService, private routerService: Router, private alertifyService: AlertifyService) {

  }

  canActivate(): boolean {

    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.alertifyService.error('Sorry !! <br/> You are not authorized to access. <br/>Kindly Login to access it.');
      this.routerService.navigate(['/home']);
    }
  }

}
