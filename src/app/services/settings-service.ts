import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingsService {

    // url = 'http://localhost:9000/api/setting';
    url = 'https://moviesreviewapp.herokuapp.com/api/settings';

    constructor(private httpCall: HttpClient) {
    }

    getAppVersion() {
        return new Promise(resolve => {
            this.httpCall.get(this.url)
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

}
