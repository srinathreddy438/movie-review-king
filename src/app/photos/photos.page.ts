import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosService } from 'src/app/services/photo-service';
import { Router } from '@angular/router';
import { AccountsService } from '../services/account-service';
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
  isAdmin: boolean;
  constructor(public accountsService: AccountsService, public photosService: PhotosService, private router: Router) { }

  ngOnInit() {
    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.isAdmin = true;
    }
    this.photosList = [];
    this.getPhotos();
    this.slideOpts = {
      autoplay: true
    };
  }

  getPhotos() {
    this.photosService.getAllPhotosList().then((data: PhotoModel[]) => {
      const initData = data;
      const uniqNames = [];
      initData.forEach((item: PhotoModel) => {
        const checkExist = uniqNames.findIndex((name) => {
          return name === item.groupByName;
        });
        if (checkExist === -1) {
          uniqNames.push(item.groupByName);
        }
      });
      uniqNames.forEach((name) => {
        const result = initData.filter((item) => {
          return  name === item.groupByName;
        });
        this.photosList.push(result);
      });
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
