import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  counter = 0;
  loader$ = new BehaviorSubject(false);
  constructor() { }

  showLoader() {
    this.counter++;
    console.log(this.counter);
    Promise.resolve().then(()=>{

      this.loader$.next(true);
    })
  }
  hideLoader() {
    this.counter--;
    if (this.counter <= 0) {

      this.loader$.next(false);
      this.counter = 0;
    }
  }
}
