import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { ActivatedRoute } from '@angular/router';

class MovieModel {
  constructor(
    public title?: string,
    public description?: String,
    public language?: String,
    public releasingDate?: Date,
    public certificate?: String,
    public image?: String,
    public video?: String,
    public director?: String,
    public producer?: String,
    public musicDirector?: String,
    public cast?: String,
  ) {
  }
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {

  // movie: MovieModel;
  movie: any;
  languages: Array<string>;
  constructor(private activatedRoute: ActivatedRoute, public movieService: MoviesService) {
    this.languages = [
      'Telugu',
      'Hindi',
      'English',
      'Tamil',
      'Malayalam',
      'Kannada'
    ];
    this.movie = new MovieModel();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.getReviewList(id);
        }
      }
    );
  }

  getReviewList(id) {
    this.movieService.getMovie(id).then((data: Response) => {
      this.movie = data;
    });
  }

  save(): void {
    if (this.movie && this.movie._id) {
      this.movieService.updateMovie(this.movie);
    } else {
      this.movieService.createMovie(this.movie);
    }
  }

}
