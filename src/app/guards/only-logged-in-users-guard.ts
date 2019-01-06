import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../services/account-service';
@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(
    private router: Router,
    public accountsService: AccountsService,
  ) { }

  canActivate() {
    console.log('OnlyLoggedInUsers');
    const userName = this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName;
    if (userName) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
