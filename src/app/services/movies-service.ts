import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class MoviesService {

    data: any;
    // url = 'http://localhost:9000/api/movies';
    url = 'https://moviesreviewapp.herokuapp.com/api/movies';

    constructor(public http: Http, private httpCall: HttpClient) {
        this.data = null;
    }
    getMovies() {
        /*if (this.data) {
            return Promise.resolve(this.data);
        }*/
        return new Promise(resolve => {
            this.httpCall.get(this.url)
                // .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    getMovie(id) {
        return new Promise(resolve => {
            this.httpCall.get(this.url + '/' + id)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

    createMovie(movie) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url, JSON.stringify(movie), { headers: headers })
            .subscribe(res => {
            });
    }

    updateMovie(movie) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = this.url + '/' + movie._id;
        this.http.put(url, JSON.stringify(movie), { headers: headers })
            .subscribe(res => {
            });
    }

    deleteMovie(id) {
        this.http.delete('http://localhost:9000/api/movies/' + id).subscribe((res) => {
        });
    }

}
