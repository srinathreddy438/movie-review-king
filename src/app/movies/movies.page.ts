import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies-service';
import {map} from 'rxjs/operators';


class MovieModel {
  constructor(
      public title?: string,
      public description?: string,
      public rating?: number,
      public id?: number
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

  constructor(public Service: MoviesService) { }

  ngOnInit() {
    this.movies = [];
    this.getReviewList();
  }

  getReviewList() {
    this.Service.getMovies().then((data: Response) => {
      console.log(data);
      this.movies = data.json();
    });
  }
}
