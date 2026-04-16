import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cancle {

  private cancelRequest$=new Subject<void>();
  constructor() { }

  cancelPendingRequest()
  {
    this.cancelRequest$.next(); //this is observer
  }

  getCancelNotifier() {
  return this.cancelRequest$.asObservable(); //this is observable so other can subscribe it
}
}
