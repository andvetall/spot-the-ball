import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { MenuConstants } from "../../shared/constants/menu.constants";
import { MenuService } from "src/app/services/menu-service";
import * as jwtdecode from "jwt-decode";
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RateModalComponent } from './shared/components/rate-modal/rate-modal.component';
import { HowToPlayComponent } from 'src/app/shared/components/how-to-play/how-to-play.component';

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {

  @ViewChild("toolBar", null) toolBar: ElementRef;
  public menuData = MenuConstants;
  public showFullSizeMenu: boolean = true;
  public badgeData: number = 0;
  public user: any = null;

  constructor(
    private _menuService: MenuService,
    private _authService : AuthService,
    private dialog: MatDialog,
    ) {
    this._menuService.fullSizeMenu.subscribe(res => this.showFullSizeMenu = res, err => err)
  }

  ngOnInit() {
    this.toolBar;
    this.user = jwtdecode(localStorage.getItem('user'));
    this.getUserData()
  }

  getUserData(){
    this._authService.checkEmail(this.user.email).subscribe((res: any) => {
      if(res) {
        if(res.rate){
          const user = jwtdecode(localStorage.getItem('user'));
          const dateToken = user.iat;
          const dateCurrent = new Date().getTime()/1000;
          if(dateCurrent - dateToken < 60){
            setTimeout(() => {
              const dialogRef = this.dialog.open(HowToPlayComponent, {
                width: "700px",
              });
            }, 1000)
          }
          return;
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.user;
        const dialogRef = this.dialog.open(RateModalComponent, dialogConfig);
      }
    }, err => err)
  }

  public toggleMenu() {
    // this.showFullSizeMenu = !this.showFullSizeMenu;
    // this._menuService.showFullSizeMenu(this.showFullSizeMenu);
  }
  
}
