import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-trending-videos',
  templateUrl: './trending-videos.page.html',
  styleUrls: ['./trending-videos.page.scss'],
})
export class TrendingVideosPage implements OnInit {
  @ViewChild('mySlider', { read: Slides }) slides: Slides;
  videoUrl1: string;
  videoUrl2: string;
  videoUrl3: string;
  slideOpts: any;
  constructor() { }

  ngOnInit() {
    this.videoUrl1 = 'https://www.youtube.com/embed/MTXXMDfIicA?rel=0';
    this.videoUrl2 = 'https://www.youtube.com/embed/otAcYFVFE7k';
    this.videoUrl3 = 'https://www.youtube.com/embed/HS8Df6ngZ24';
    this.slides.options = {
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    };
  }

  slidesDidLoad(slides: Slides) {
    this.slides.startAutoplay();
  }
}
