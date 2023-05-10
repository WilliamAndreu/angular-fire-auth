import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingStateService } from '../providers/utils/loading-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any= new BehaviorSubject(null);

  constructor(
    private loading:LoadingStateService
  ) { }


 async initialAuthValidation(): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    let userP: any  = this.user.value
    if (userP == null) {
      userP = await localStorage.getItem("user")
    } else {
      userP = this.user.value
    }
    if (userP) {
      this.user.next(userP)
      resolve(true)
    } else {
      resolve(false)
    }
  });
}

}
