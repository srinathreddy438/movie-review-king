import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.page.html',
  styleUrls: ['./review-form.page.scss'],
})
export class ReviewFormPagePopOver implements OnInit {

  ratingArr: Array<Object>;
  ratingSelected: number;
  constructor(public viewCtrl: PopoverController) { }

  ngOnInit() {
    this.ratingSelected = 0;
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
    this.ratingSelected = index + 1;
    this.ratingArr.forEach((item: any) => {
        item.selected = false;
    });
    this.ratingArr.forEach((item: any) => {
      if (item.rating <= index + 1) {
        item.selected = true;
      }
    });
  }
  dismiss() {
    const data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
