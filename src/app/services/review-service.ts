import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class ReviewsService {

    data: any;
    // url = 'http://localhost:9000/api/reviews';
    url = 'https://moviesreviewapp.herokuapp.com/api/reviews';

    constructor(public http: Http) {
        this.data = null;
    }

    getAllMoviesReviewsList() {
        return new Promise(resolve => {
            this.http.get(this.url)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    getCurrentMovieReviewsList(id) {
        return new Promise(resolve => {
            this.http.get(this.url + '/' + id)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    createReview(review) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.url, JSON.stringify(review), { headers: headers }).subscribe(res => {
                resolve(res);
            });
        });
    }

    updateReview(review) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const url = this.url + '/' + review._id;
            this.http.put(url, JSON.stringify(review), { headers: headers }).subscribe(res => {
                resolve(res);
            });
        });
    }

    deleteReview(review) {
        return new Promise(resolve => {
            const url = this.url + '/' + review._id;
            this.http.delete(url).subscribe((res) => {
                resolve(res);
            });
        });
    }

}
