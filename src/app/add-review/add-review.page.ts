import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ReviewFormPagePopOver } from './review-form/review-form.page';

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
  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService: MoviesService,
    public popoverController: PopoverController) {
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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ReviewFormPagePopOver,
      event: ev,
      translucent: true,
      cssClass: 'rating-popover',
      animated: true,
      componentProps: {name: 'sri'}
    }
    );
    popover.onDidDismiss().then(data => {
      console.log(data);
    });
    return await popover.present();
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
