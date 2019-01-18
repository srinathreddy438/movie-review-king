import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosService } from 'src/app/services/photo-service';
import { Router } from '@angular/router';
class PhotoModel {
  constructor(
    public imageName?: string,
    public groupByName?: string,
    public showSlider?: boolean,
    public _id?: any
  ) {
    this.showSlider = true;
  }
}
@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  slideOpts: any;
  photosList: any;
  constructor(public photosService: PhotosService, private router: Router) { }

  ngOnInit() {
    this.getPhotos();
    this.slideOpts = {
      autoplay: true
    };
  }

  getPhotos() {
    this.photosService.getAllPhotosList().then((data: Response) => {
      this.photosList = data;
    });
  }

  updatePhotoDetails(photo) {
    this.router.navigate(['update-photos', photo._id]);
  }
  deletePhoto(photo) {
    this.photosService.deletePhoto(photo).then((deleteObj: any) => {
      this.getPhotos();
    });
  }
}
