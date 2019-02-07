import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrendingService } from 'src/app/services/trending-service';
import { AccountsService } from '../services/account-service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { LoaderService } from '../shared/interceptor';

class TrendingModel {
  constructor(
    public imageName?: string,
    public videoUrl?: string,
    public videoTitle?: boolean,
    public _id?: any
  ) {
  }
}
@Component({
  selector: 'app-trending-videos',
  templateUrl: './trending-videos.page.html',
  styleUrls: ['./trending-videos.page.scss'],
})
export class TrendingVideosPage implements OnInit {
  trendingList: TrendingModel[];
  isAdmin: boolean;
  pageNum: number;
  limit: number;
  constructor(
    public loaderService: LoaderService,
    public accountsService: AccountsService,
    public trendingService: TrendingService,
    private router: Router,
    private youtube: YoutubeVideoPlayer) {
      this.trendingList = [];
  }

  ngOnInit() {
    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.isAdmin = true;
    }
    this.pageNum = 0;
    this.limit = 5;
    this.getTrendings(this.pageNum, this.limit);
  }

  getTrendings(pageNum, limit) {
    this.trendingService.getAllTrendingsList(pageNum, limit).then((data: TrendingModel[]) => {
      this.trendingList = data;
    });
  }

  updateTrendingDetails(trending) {
    this.router.navigate(['update-trending-videos', trending._id]);
  }
  deleteTrending(trending) {
    this.trendingService.deleteTrending(trending).then((deleteObj: any) => {
      this.getTrendings(this.pageNum, this.limit);
    });
  }

  playVideo(url) {
    this.youtube.openVideo(url);
  }

  loadMoreData(event) {
    this.loaderService.hideLoader = true;
    // https://www.youtube.com/watch?v=Y3kN-XX32wU
    this.pageNum++;
    this.trendingService.getAllTrendingsList(this.pageNum, this.limit).then((data: TrendingModel[]) => {
      if (data && data.length) {
        this.trendingList = this.trendingList.concat(data);
      }
      event.target.complete();
      if (data.length < this.limit) {
        event.target.disabled = true;
      }
      this.loaderService.hideLoader = false;
    });
  }
}
