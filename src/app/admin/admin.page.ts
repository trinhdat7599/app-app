import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


export interface Products {
  code: string;
  name: string;
  pirce: string;
  image: string;
}

export interface Category {
  code: string;
  categoryname: string;
  expanded: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  code = '';
  name = '';
  pirce = '';
  image = '';

  public formName = new FormGroup({
    category: new FormControl()
  });
  public cameraImage: string ;
  public Categoryname: Observable<Category[]>;
  mainuser: AngularFirestoreCollection<Category>;
  sub;
  items: Observable<Category[]> ;

  constructor(
    private _CAMERA: Camera,
    private afs: AngularFirestore,
    public alertController: AlertController,
    public router: Router,

    ) {
      this.mainuser = this.afs.collection<Category>('category');
      this.items = this.mainuser.valueChanges();
    }
    importCode() {
      const category: any = this.formName.controls.category.value;
      this.code = category;
      console.log(category);
    }

    selectImage() {
       return new Promise(resolve => {
          const cameraOptions: CameraOptions = {
              sourceType         : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
              destinationType    : this._CAMERA.DestinationType.DATA_URL,
              quality            : 100,
              targetWidth        : 320,
              targetHeight       : 240,
              encodingType       : this._CAMERA.EncodingType.JPEG,
              correctOrientation : true
          };
          this._CAMERA.getPicture(cameraOptions).then((data) => {
             this.cameraImage 	= 'data:image/jpeg;base64,' + data;
             resolve(this.cameraImage);
             this.image = this.cameraImage;
          }, (err) => {
            console.log(err);
          });
       });
    }
    newProducts() {
      try {
      const { code, image, name, pirce} = this;
      this.afs.collection<Products>('products').add({
        code,
        image,
        name,
        pirce
      });
      this.presentAlert('Success', 'Đã thêm mới thành công');
      this.router.navigate(['/main']);
      } catch (error) {
        console.dir(error);
      this.presentAlert('Promiss', error);
      }
    }
     async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      });
      await alert.present();
    }
  ngOnInit() {
    this.Categoryname = this.items;
  }

}
