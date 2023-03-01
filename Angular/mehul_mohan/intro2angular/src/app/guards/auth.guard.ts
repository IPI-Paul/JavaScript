import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if (!this.authService.isLoggedIn) {
      //   // we might be logged in!
      //   return true;
      //   // this.router.navigate(['login']);
      // }
      //return this.authService.isLoggedIn;
      return this.userService.isLoggedIn().pipe(map(res => {
        if (res.status) {
          this.authService.setLoggedIn(true);
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
        // return res.status;
      }));
  }
  
}
