import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies-service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountsService } from '../services/account-service';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../shared/interceptor';
import { ModalController, InfiniteScroll, Content } from '@ionic/angular';

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
  prefferedLanguage;
  showSearch;
  category: string;
  title: string;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild( Content ) pageTop: Content;
  constructor(
    private activatedRoute: ActivatedRoute,
    public Service: MoviesService,
    private router: Router,
    public accountsService: AccountsService,
    public loadingController: LoadingController,
    public loaderService: LoaderService,
    public modalController: ModalController) {
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.category = params.get('category');
        if (this.category === 'playing') {
          this.title = 'Now Showing Movies';
        } else if (this.category === 'upcoming') {
          this.title = 'Upcoming Movies';
        } else if (this.category === 'previous') {
          this.title = 'Previous Movies';
        }
      }
    );
    if (!localStorage.prefferedLanguage) {
      localStorage.prefferedLanguage = 'All Languages';
    }
    this.prefferedLanguage = localStorage.prefferedLanguage;
    this.showSearch = false;
    this.pageNum = 0;
    this.limit = 4;
    this.movies = [];
    this.getMoviesList();
    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.isAdmin = true;
    }
  }

  toggleSearc() {
    // this.showSearch = !this.showSearch;
  }

  getMoviesList() {
    // this.presentLoading();
    this.Service.getMovies(this.pageNum, this.limit).then((data: Response) => {
      this.movies = data;
      // this.loadingController.dismiss();
    });
  }

  goToReviewPage(movie) {
    this.router.navigate(['movies', this.category, movie._id]);
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

  async openLanguageSettings(ev: any) {
    const popover = await this.modalController.create({
      component: LanguageSettingsModel,
      cssClass: 'language-settings',
      animated: true,
      // showBackdrop: true,
      // backdropDismiss: true,
      componentProps: { prefferedLanguage: this.prefferedLanguage}
    }
    );
    popover.onDidDismiss().then(data => {
      if (data && data.data) {
        if (localStorage.prefferedLanguage && (localStorage.prefferedLanguage !== data.data)) {
          localStorage.prefferedLanguage = data.data;
          this.prefferedLanguage = localStorage.prefferedLanguage;
          this.pageNum = 0;
          this.infiniteScroll.disabled = false;
          this.pageTop.scrollToTop();
          this.getMoviesList();
        }
      }
    });
    return await popover.present();
  }
}

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.page.html'
})
export class LanguageSettingsModel implements OnInit {
  languages: Array<string>;
  constructor(public modalController: ModalController) {
    this.languages = [
      'All Languages',
      'Telugu',
      'Hindi',
      'English',
      'Tamil',
      'Malayalam',
      'Kannada'
    ];
  }
  ngOnInit() {
  }
  selectLanguage(language) {
    this.modalController.dismiss(language);
  }
}
