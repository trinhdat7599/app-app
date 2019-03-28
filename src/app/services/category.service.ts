import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface Todo {
  code: string;
  categoryname: string;
  expanded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  mainuser: AngularFirestoreCollection<Todo>;
  sub;
  items: Observable<Todo[]> ;

  constructor(private afs: AngularFirestore) {
    this.mainuser = this.afs.collection<Todo>('category');
    this.items = this.mainuser.valueChanges();
  }
  getCategoryName() {
    return this.items;
  }
}
