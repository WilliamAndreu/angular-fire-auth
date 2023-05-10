import { Component, OnInit } from '@angular/core';
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import AdditionalUserInfo = firebase.auth.AdditionalUserInfo;

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {
  user: AdditionalUserInfo | undefined;
  constructor() {

  }

  ngOnInit(): void {
    const currentColor = localStorage.getItem("user");
    if(currentColor !== null) {
      this.user =  JSON.parse(currentColor) as AdditionalUserInfo
      console.log(this.user);
    }
  }



}
