import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PhotosService {

    data: any;
    // url = 'http://localhost:9000/api/photos';
    url = 'https://moviesreviewapp.herokuapp.com/api/photos';

    constructor(private httpCall: HttpClient) {
        this.data = null;
    }

    getAllPhotosList() {
        return new Promise(resolve => {
            this.httpCall.get(this.url)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

    getCurrentPhotoDetails(id) {
        return new Promise(resolve => {
            this.httpCall.get(this.url + '/' + id)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    createPhoto(photoObj) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.httpCall.post(this.url, JSON.stringify(photoObj), httpOptions).subscribe(res => {
                resolve(res);
            });
        });
    }

    updatePhoto(photoObj) {
        return new Promise(resolve => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const url = this.url + '/' + photoObj._id;
            this.httpCall.put(url, JSON.stringify(photoObj), httpOptions).subscribe(res => {
                resolve(res);
            });
        });
    }

    deletePhoto(photoObj) {
        return new Promise(resolve => {
            const url = this.url + '/' + photoObj._id;
            this.httpCall.delete(url).subscribe((res) => {
                resolve(res);
            });
        });
    }

}
