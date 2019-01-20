import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountsService } from '../services/account-service';
import { LoadingController } from '@ionic/angular';




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

  constructor(
    public Service: MoviesService,
    private router: Router,
    public accountsService: AccountsService,
    public loadingController: LoadingController) {
    }

  ngOnInit() {
    this.movies = [];
    this.getMoviesList();
    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.isAdmin = true;
    }
  }

  getMoviesList() {
    // this.presentLoading();
    this.Service.getMovies().then((data: Response) => {
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
}
