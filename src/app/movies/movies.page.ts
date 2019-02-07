import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountsService } from '../services/account-service';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../shared/interceptor';

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
  isAdmin: boolean;
  pageNum: number;
  limit: number;

  constructor(
    public Service: MoviesService,
    private router: Router,
    public accountsService: AccountsService,
    public loadingController: LoadingController,
    public loaderService: LoaderService) {
    }

  ngOnInit() {
    this.pageNum = 0;
    this.limit = 3;
    this.movies = [];
    this.getMoviesList();
    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.isAdmin = true;
    }
  }

  getMoviesList() {
    // this.presentLoading();
    this.Service.getMovies(this.pageNum, this.limit).then((data: Response) => {
      this.movies = data;
      // this.loadingController.dismiss();
    });
  }

  goToReviewPage(movie) {
    this.router.navigate(['movies', movie._id]);
  }
  updateMovieDetails(movie) {
    this.router.navigate(['update-movie', movie._id]);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });
    return await loading.present();
  }

  deleteMovie(movie) {
    this.Service.deleteMovie(movie).then((deleteObj: any) => {
      this.getMoviesList();
    });
  }

  loadMoreData(event) {
    this.loaderService.hideLoader = true;
    // https://www.youtube.com/watch?v=Y3kN-XX32wU
    this.pageNum++;
    this.Service.getMovies(this.pageNum, this.limit).then((data: MovieModel[]) => {
      if (data && data.length) {
        this.movies = this.movies.concat(data);
      }
      event.target.complete();
      if (data.length < this.limit) {
        event.target.disabled = true;
      }
      this.loaderService.hideLoader = false;
    });
  }
}
