import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AccountsService } from '../services/account-service';
import { Router } from '@angular/router';

class AccountModel {
  constructor(
    public userName?: string,
    public _id?: any
  ) {
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  account: AccountModel;
  userSessionExists: Boolean;
  constructor(public toastController: ToastController,
    public accountsService: AccountsService,
    private router: Router) {
    this.account = new AccountModel();
  }

  ngOnInit() {
    if (this.accountsService && this.accountsService.getLoginInfo()) {
      this.account = this.accountsService.getLoginInfo();
      this.userSessionExists = true;
    }
  }

  login() {
    const username = this.account && this.account.userName && this.account.userName.trim();
    if (username && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === username) {
      this.router.navigate(['']);
    } else {
      if (username && username.length && (username.length > 3)) {
        if (this.account && this.account._id) {
          this.account.userName = this.account.userName.trim();
          this.accountsService.updateAccount(this.account, this.accountsService.getLoginInfo().userName).then((userObj: any) => {
            if (userObj === 'accountExisted') {
              const msg = 'username exists';
              this.presentToastWithOptions(msg);
            } else {
              this.accountsService.setLoginInfo(this.account);
              this.router.navigate(['']);
            }
          });
        } else {
          this.accountsService.createAccount(this.account).then((userObj: any) => {
            this.account.userName = this.account.userName.trim();
            if (userObj === 'accountExisted') {
              const msg = 'username exists';
              this.presentToastWithOptions(msg);
            } else {
              this.accountsService.setLoginInfo(userObj);
              this.account = userObj;
              this.router.navigate(['']);
            }
          });
        }
      } else {
        const msg = 'username must contain minimum of 4 characters';
        this.presentToastWithOptions(msg);
      }
    }
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
