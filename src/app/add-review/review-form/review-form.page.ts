import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ReviewsService } from './../../services/review-service';
import * as moment_ from 'moment';
export const moment = moment_['default'];


class ReviewModel {
  constructor(
    public movieId?: String,
    public userName?: String,
    public description?: String,
    public rating?: Number,
    public ratingGivenDate?: Date,
    public _id?: any
  ) {
    this.rating = 0;
  }
}
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.page.html',
  styleUrls: ['./review-form.page.scss'],
})
export class ReviewFormPagePopOver implements OnInit {

  ratingArr: Array<Object>;
  reviewModel: ReviewModel;
  constructor(
    public viewCtrl: PopoverController,
    public reviewsService: ReviewsService
  ) {
    this.reviewModel = new ReviewModel();
  }

  ngOnInit() {
    this.initializeRating();
  }
  initializeRating() {
    this.ratingArr = [
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
  }
  giveRating(index) {
    this.reviewModel.rating = index + 1;
  }
  submitReview() {
    if (this.reviewModel && this.reviewModel.rating) {
      // this.reviewModel.ratingGivenDate = moment().format('DD/MM/YYYY');
      this.reviewModel.ratingGivenDate = moment()._d;
      if (this.reviewModel && this.reviewModel._id) {
        this.reviewsService.updateReview(this.reviewModel).then((reviewsObj: any) => {
          // this.viewCtrl.dismiss(reviewsObj.json());
          this.viewCtrl.dismiss();
        });
      } else {
        this.reviewsService.createReview(this.reviewModel).then((reviewsObj: any) => {
          // this.viewCtrl.dismiss(reviewsObj.json());
          this.viewCtrl.dismiss();
        });
      }
    }
  }

  deleteReview() {
    this.reviewsService.deleteReview(this.reviewModel).then((reviewsObj: any) => {
      // this.viewCtrl.dismiss(reviewsObj.json());
      this.viewCtrl.dismiss();
    });
  }
  /*dismiss() {
    const data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }*/
}
