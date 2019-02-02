import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountsService {

    data: any;
    // url = 'http://localhost:9000/api/accounts';
    url = 'https://moviesreviewapp.herokuapp.com/api/accounts';

    constructor(private httpCall: HttpClient) {
        this.data = null;
    }

    setLoginInfo(obj) {
        localStorage.userInfo = JSON.stringify(obj);
    }
    getLoginInfo() {
        return (localStorage && localStorage.userInfo) ? JSON.parse(localStorage.userInfo) : '';
    }

    createAccount(account) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.httpCall.post(this.url, JSON.stringify(account), httpOptions)
                .subscribe(res => {
                    resolve(res);
                });
        });
    }

    updateAccount(account, oldUserName) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const url = this.url + '/' + account._id + '/' + oldUserName;
            this.httpCall.put(url, JSON.stringify(account), httpOptions)
                .subscribe(res => {
                    resolve(res);
                });
        });
    }

}
