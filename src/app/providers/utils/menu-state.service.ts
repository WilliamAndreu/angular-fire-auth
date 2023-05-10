import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  //var to control loading state(loading animation)
  public currentpage$ = new BehaviorSubject("home")

  constructor() { }

  getCurrentPage(){
    return this.currentpage$.value
  }

  changePage(page:string){
    this.currentpage$.next(page)
  }

}
