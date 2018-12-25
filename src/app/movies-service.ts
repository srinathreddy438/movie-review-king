import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class MoviesService {

    data: any;
    url = 'http://localhost:9000/api/movies';
    // url = 'https://moviesreviewapp.herokuapp.com/api/reviews';

    constructor(public http: Http) {
        this.data = null;
    }

    getMovies() {

        /*if (this.data) {
            return Promise.resolve(this.data);
        }*/

        return new Promise(resolve => {

            this.http.get(this.url)
                // .map(res => res.json())
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
                console.log(res.json());
            });

    }

    deleteMovie(id) {

        this.http.delete('http://localhost:9000/api/movies/' + id).subscribe((res) => {
            console.log(res.json());
        });

    }

}
