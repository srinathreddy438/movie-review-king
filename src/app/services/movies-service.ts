import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class MoviesService {
    data: any;
    // url = 'http://localhost:9000/api/movies';
    url = 'https://moviesreviewapp.herokuapp.com/api/movies';

    constructor(private httpCall: HttpClient) {
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
        this.httpCall.post(this.url, JSON.stringify(movie), httpOptions)
            .subscribe(res => {
            });
    }

    updateMovie(movie) {
        const url = this.url + '/' + movie._id;
        this.httpCall.put(url, JSON.stringify(movie), httpOptions)
            .subscribe(res => {
            });
    }

    deleteMovie(movie) {
        return new Promise(resolve => {
            const url = this.url + '/' + movie._id;
            this.httpCall.delete(url).subscribe((res) => {
                resolve(res);
            });
        });
    }

}
