import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserInfoDialogComponent} from "../../components/user-info-dialog/user-info-dialog.component";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  public loading = false
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {

  }

  login() {
    this.loading = true;
    this.authService.GoogleAuth().then( () => {
      setTimeout(() => {
        this.loading = false;
        this.openDialog();
      }, 800);

    });
  }

  loginEmail() {
    this.loading = true;
    this.authService.emailLogin('willy@rudo.es', 'Rudo123').then((result) => {
      console.log(result);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, { panelClass: 'bg-color'});

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
