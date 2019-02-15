import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ReviewFormPagePopOver } from './review-form/review-form.page';
import { MoviesService } from '../services/movies-service';
import { AccountsService } from '../services/account-service';
import { ReviewsService } from './../services/review-service';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

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
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  // movie: MovieModel;
  movie: any;
  userName: string;
  ratingList: any;
  ratingStarsList: Array<Object>;
  routerId: String;
  overalRating: number;
  ratingExist: boolean;
  category: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService: MoviesService,
    public accountsService: AccountsService,
    public reviewsService: ReviewsService,
    public popoverController: PopoverController,
    private youtube: YoutubeVideoPlayer) {
    this.movie = new MovieModel();
  }

  ngOnInit() {
    this.overalRating = 0;
    this.ratingExist = false;
    this.ratingStarsList = [
      {
        rating: 1,
        selected: false
      },
      {
        rating: 2,
        selected: false
      }, {
        rating: 3,
        selected: false
      }, {
        rating: 4,
        selected: false
      }, {
        rating: 5,
        selected: false
      }, {
        rating: 6,
        selected: false
      }, {
        rating: 7,
        selected: false
      },
      {
        rating: 8,
        selected: false
      }, {
        rating: 9,
        selected: false
      }, {
        rating: 10,
        selected: false
      }
    ];
    this.userName = this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName;
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.category = params.get('category');
        const id = params.get('id');
        this.routerId = id;
        this.getMovieDetails(id);
        this.getReviewList(id);
      }
    );
  }

  playVideo(url) {
    this.youtube.openVideo(url);
  }

  async presentPopover(ev: any, existRatingObj) {
    const existRating = existRatingObj ? { ...existRatingObj } : '';
    const popover = await this.popoverController.create({
      component: ReviewFormPagePopOver,
      event: ev,
      translucent: true,
      cssClass: 'rating-popover',
      animated: true,
      componentProps: { reviewModel: (existRating || { movieId: this.movie._id, userName: this.userName }) }
    }
    );
    popover.onDidDismiss().then(data => {
      /*if (data && data.data) {
        this.ratingList = data.data;
      }*/
      this.getReviewList(this.routerId);
    });
    return await popover.present();
  }

  getMovieDetails(id) {
    this.movieService.getMovie(id).then((data: Response) => {
      this.movie = data;
      /*if (this.movie.video) {
        this.movie.video = 'https://www.youtube.com/embed/' + this.movie.video;
      }*/
    });
  }

  getReviewList(id) {
    this.reviewsService.getCurrentMovieReviewsList(id).then((data: Response) => {
      this.ratingExist = false;
      this.overalRating = 0;
      this.ratingList = data;
      this.ratingList.forEach(element => {
        if (element && element.rating) {
          this.overalRating = this.overalRating + Number(element.rating);
        }
        if (element && element.userName &&
          this.accountsService &&
          this.accountsService.getLoginInfo() &&
          (element.userName === this.accountsService.getLoginInfo().userName)) {
            this.ratingExist = true;
        }
      });
    });
  }

  updateRating(ev, ratingObj) {
    this.presentPopover(ev, ratingObj);
  }
}
