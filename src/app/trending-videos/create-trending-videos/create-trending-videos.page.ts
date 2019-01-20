import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrendingService } from 'src/app/services/trending-service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-create-trending-videos',
  templateUrl: './create-trending-videos.page.html',
  styleUrls: ['./create-trending-videos.page.scss'],
})
export class CreateTrendingVideosPage implements OnInit {
  trending: TrendingModel;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, public trendingService: TrendingService) {
    this.trending = new TrendingModel();
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.getVideoDetails(id);
        }
      }
    );
  }

  getVideoDetails(id) {
    this.trendingService.getCurrentTrendingDetails(id).then((data: TrendingModel) => {
      this.trending = data && data[0];
    });
  }

  createVideo() {
    if (this.trending && this.trending.videoUrl) {
      if (this.trending && this.trending._id) {
        this.trendingService.updateTrending(this.trending).then((trendingsObj: any) => {
          this.router.navigate(['trending-videos']);
        });
      } else {
        this.trendingService.createTrending(this.trending).then((trendingsObj: any) => {
          this.router.navigate(['trending-videos']);
        });
      }
    }
  }

}
