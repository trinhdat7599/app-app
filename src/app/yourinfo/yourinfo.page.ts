import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';

import { LoadingController } from '@ionic/angular';

import * as firebase from 'firebase';

import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-yourinfo',
  templateUrl: './yourinfo.page.html',
  styleUrls: ['./yourinfo.page.scss']
})
export class YourinfoPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
 // result;
  // loading;
  // constructor(private camera: Camera, private file: File, public loadingController: LoadingController) {}
  // ngOnInit() {
  //   firebase.initializeApp({});
  // }
  // async pickImage() {
  //   const options: CameraOptions = {
  //     quality: 80,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };

  //   try {
  //     const cameraInfo = await this.camera.getPicture(options);
  //     this.presentLoadingWithOptions();
  //     const blobInfo = await this.makeFileIntoBlob(cameraInfo);
  //     const uploadInfo: any = await this.uploadToFirebase(blobInfo);
  //     this.loading.dismiss();
  //     alert('File Upload Success ' + uploadInfo.fileName);
  //   } catch (e) {
  //     console.log(e.message);
  //     alert('File Upload Error ' + e.message);
  //   }
  // }
  // makeFileIntoBlob(_imagePath) {
  //   // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
  //   return new Promise((resolve, reject) => {
  //     let fileName = '';
  //     this.file
  //       .resolveLocalFilesystemUrl(_imagePath)
  //       .then(fileEntry => {
  //         const { name, nativeURL } = fileEntry;

  //         // get the path..
  //         const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
  //         console.log('path', path);
  //         console.log('fileName', name);

  //         fileName = name;

  //         // we are provided the name, so now read the file into
  //         // a buffer
  //         return this.file.readAsArrayBuffer(path, name);
  //       })
  //       .then(buffer => {
  //         // get the buffer and make a blob to be saved
  //         const imgBlob = new Blob([buffer], {
  //           type: 'image/jpeg'
  //         });
  //         console.log(imgBlob.type, imgBlob.size);
  //         resolve({
  //           fileName,
  //           imgBlob
  //         });
  //       })
  //       .catch(e => reject(e));
  //   });
  // }

  // uploadToFirebase(_imageBlobInfo) {
  //   console.log('uploadToFirebase');
  //   return new Promise((resolve, reject) => {
  //     const fileRef = firebase
  //       .storage()
  //       .ref(_imageBlobInfo.fileName);

  //     const uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

  //     uploadTask.on(
  //       'state_changed',
  //       (_snapshot: any) => {
  //         console.log(
  //           'snapshot progess ' +
  //             (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
  //         );
  //       },
  //       _error => {
  //         console.log(_error);
  //         reject(_error);
  //       },
  //       () => {
  //         // completion...
  //         resolve(uploadTask.snapshot);
  //       }
  //     );
  //   });
  // }


  // async presentLoadingWithOptions() {
  //    this.loading = await this.loadingController.create({
  //     spinner: null,
  //     message: 'Please wait...',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading'
  //   });
  //   return await this.loading.present();
  // }
