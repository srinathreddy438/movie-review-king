import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotosService } from 'src/app/services/photo-service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-create-photos',
  templateUrl: './create-photos.page.html',
  styleUrls: ['./create-photos.page.scss'],
})
export class CreatePhotosPage implements OnInit {
  photo: PhotoModel;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, public photosService: PhotosService) {
    this.photo = new PhotoModel();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.getPhotoDetails(id);
        }
      }
    );
  }

  getPhotoDetails(id) {
    this.photosService.getCurrentPhotoDetails(id).then((data: PhotoModel) => {
      this.photo = data && data[0];
    });
  }

  createPhoto() {
    if (this.photo && this.photo.imageName) {
      if (this.photo && this.photo._id) {
        this.photosService.updatePhoto(this.photo).then((photosObj: any) => {
          this.router.navigate(['photos']);
        });
      } else {
        this.photosService.createPhoto(this.photo).then((photosObj: any) => {
          this.router.navigate(['photos']);
        });
      }
    }
  }

}
