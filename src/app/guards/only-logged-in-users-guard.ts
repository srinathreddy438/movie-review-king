import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    console.log('OnlyLoggedInUsers');
    /*if (localStorage.userName) {
      return true;
    } else {
        this.router.navigate(['login']);
      return false;
    }*/
    return true;
  }
}
