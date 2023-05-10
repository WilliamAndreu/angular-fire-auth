import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {

  //var to control loading state(loading animation)
  public loading$ = new BehaviorSubject(false)

  constructor() { }

  loadingOn() {  
    this.loading$.next(true)
  }

  loadingOff() {
      this.loading$.next(false)
  }

}
