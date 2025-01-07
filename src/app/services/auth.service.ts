import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private isLoggedIn$ = new BehaviorSubject<boolean>(false); 
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  login() {
    //simulate successful login
    this.isLoggedIn$.next(true);
  }
  logout() {
    //simulate logout
    this.isLoggedIn$.next(false);

  }

  isLoggedIn() {
    return this.isLoggedIn$.asObservable();
  }

}
