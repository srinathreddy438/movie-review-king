import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ReviewsService {

    data: any;
    // url = 'http://localhost:9000/api/reviews';
    url = 'https://moviesreviewapp.herokuapp.com/api/reviews';

    constructor(private httpCall: HttpClient) {
        this.data = null;
    }

    getAllMoviesReviewsList() {
        return new Promise(resolve => {
            this.httpCall.get(this.url)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    getCurrentMovieReviewsList(id) {
        return new Promise(resolve => {
            this.httpCall.get(this.url + '/' + id)
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
            this.httpCall.post(this.url, JSON.stringify(review), httpOptions).subscribe(res => {
                resolve(res);
            });
        });
    }

    updateReview(review) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const url = this.url + '/' + review._id;
            this.httpCall.put(url, JSON.stringify(review), httpOptions).subscribe(res => {
                resolve(res);
            });
        });
    }

    deleteReview(review) {
        return new Promise(resolve => {
            const url = this.url + '/' + review._id;
            this.httpCall.delete(url).subscribe((res) => {
                resolve(res);
            });
        });
    }

}
