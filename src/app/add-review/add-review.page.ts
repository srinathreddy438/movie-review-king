import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies-service';

class ReviewModel {
  constructor(
      public title?: string,
      public description?: string,
      public rating?: number
  ) {
  }
}

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  review: ReviewModel;
  constructor(public reviewService: MoviesService) {
    this.review = new ReviewModel();
  }

  ngOnInit() {
  }

  save(): void {
    this.reviewService.createMovie(this.review);
  }
}
