import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-videos',
  templateUrl: './trending-videos.page.html',
  styleUrls: ['./trending-videos.page.scss'],
})
export class TrendingVideosPage implements OnInit {
  videoUrl1: string;
  videoUrl2: string;
  videoUrl3: string;
  constructor() { }

  ngOnInit() {
    this.videoUrl1 = 'https://www.youtube.com/embed/MTXXMDfIicA?rel=0';
    this.videoUrl2 = 'https://www.youtube.com/embed/otAcYFVFE7k';
    this.videoUrl3 = 'https://www.youtube.com/embed/HS8Df6ngZ24';
  }

}
