import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from "../../components/user-info-dialog/user-info-dialog.component";
import {lastValueFrom} from "rxjs";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  /**
   * Indicates whether the component is currently loading.
   *
   * @type {boolean}
   * @memberof MainPageComponent
   */
  public loading = false;

  constructor(public authService: AuthService, public dialog: MatDialog) {}


  ngOnInit(): void {}

  /**
   * Authenticates the user using Google authentication.
   * Displays user information in a dialog if authentication is successful.
   *
   * @memberof MainPageComponent
   */
  async login() {
    this.loading = true;
    const value = await lastValueFrom( this.authService.GoogleAuth());
    if (value){
      this.loading = false;
      setTimeout(()=>{
        this.openDialog();
      }, 800)
    }

  }

  /**
   * Authenticates the user using email and password.
   * Logs the authentication result to the console.
   *
   * @memberof MainPageComponent
   */
  async loginEmail() {
    this.loading = true;
    const result = await lastValueFrom(this.authService.emailLogin('willy@rudo.es', 'Rudo123'));
    console.log(result);
  }

  /**
   * Opens a dialog to display user information.
   *
   * @memberof MainPageComponent
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, { panelClass: 'bg-color'});

    dialogRef.afterClosed().subscribe(result => {});
  }
}
