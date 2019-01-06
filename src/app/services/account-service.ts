import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class AccountsService {

    data: any;
    // url = 'http://localhost:9000/api/accounts';
    url = 'https://moviesreviewapp.herokuapp.com/api/accounts';

    constructor(public http: Http) {
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
            this.http.post(this.url, JSON.stringify(account), { headers: headers })
                .subscribe(res => {
                    resolve(res);
                });
        });
    }

    updateAccount(account) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const url = this.url + '/' + account._id;
            this.http.put(url, JSON.stringify(account), { headers: headers })
                .subscribe(res => {
                    resolve(res);
                });
        });
    }

}
