import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies-service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


class MovieModel {
  constructor(
    public title?: string,
    public description?: String,
    public language?: String,
    public releasingDate?: Date,
    public certificate?: String,
    public image?: String,
    public video?: String
  ) {
  }
}

@Component({
  selector: 'app-reviews',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  // movies: Array<MovieModel>;
  movies: any;

  constructor(public Service: MoviesService, private router: Router) { }

  ngOnInit() {
    this.movies = [];
    this.getReviewList();
  }

  getReviewList() {
    this.Service.getMovies().then((data: Response) => {
      this.movies = data.json();
    });
  }

  goToReviewPage(movie) {
    this.router.navigate(['movies', movie._id]);
  }
  updateMovieDetails(movie) {
    this.router.navigate(['update-movie', movie._id]);
  }
}
