
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';


export interface User {
  id?: string;
  email: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  public user: User;

  constructor(private afAuth: AngularFireAuth) {
  }
  getUsers() {
    return this.user;
  }
  setUser(user: User) {
    this.user = user;
  }
  getUsername() {
    return this.user.email;
  }
  reAuth(email: string, password: string) {
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password));
  }
  updatePassword(newpassword: string) {
    return this.afAuth.auth.currentUser.updatePassword(newpassword);
  }
  updateEmail(newemail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newemail );
  }
  async isAuthenticated() {
    if (this.user) { return true; }

    const user = await this.afAuth.authState.pipe(first()).toPromise();

    if (user) {
      this.setUser({
        email: user.email,
        uid: user.uid
      });

      return true;
    }
    return false;
  }

  getUID(): string {
    return this.user.uid;
  }
}
