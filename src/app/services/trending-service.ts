import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TrendingService {

    data: any;
    // url = 'http://localhost:9000/api/trendings';
    url = 'https://moviesreviewapp.herokuapp.com/api/trendings';

    constructor(private httpCall: HttpClient) {
        this.data = null;
    }

    getAllTrendingsList(pageNum, limit) {
        return new Promise(resolve => {
            this.httpCall.get(this.url, {params: {pageNum: pageNum, limit: limit}})
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

    getCurrentTrendingDetails(id) {
        return new Promise(resolve => {
            this.httpCall.get(this.url + '/' + id)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    createTrending(trendingObj) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.httpCall.post(this.url, JSON.stringify(trendingObj), httpOptions).subscribe(res => {
                resolve(res);
            });
        });
    }

    updateTrending(trendingObj) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const url = this.url + '/' + trendingObj._id;
            this.httpCall.put(url, JSON.stringify(trendingObj), httpOptions).subscribe(res => {
                resolve(res);
            });
        });
    }

    deleteTrending(trendingObj) {
        return new Promise(resolve => {
            const url = this.url + '/' + trendingObj._id;
            this.httpCall.delete(url).subscribe((res) => {
                resolve(res);
            });
        });
    }

}
