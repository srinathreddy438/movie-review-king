import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies-service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  // movie: MovieModel;
  movie: any;
  constructor(private activatedRoute: ActivatedRoute, public movieService: MoviesService) {
    this.movie = new MovieModel();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getReviewList(id);
      }
    );
  }

  getReviewList(id) {
    this.movieService.getMovie(id).then((data: Response) => {
      this.movie = data.json();
      if (this.movie.video) {
        this.movie.video = 'https://www.youtube.com/embed/' + this.movie.video;
      }
    });
  }
}
