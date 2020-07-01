import { Component, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MenuConstants } from "../../shared/constants/menu.constants";
import { MenuService } from "src/app/services/menu-service";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent {

  @ViewChild("toolBar", null) toolBar: ElementRef;
  public menuData = MenuConstants;
  public showFullSizeMenu: boolean = false;
  public badgeData: number = 0;

  constructor(private _router: Router, private _menuService: MenuService) {
    this._menuService.fullSizeMenu.subscribe(res => this.showFullSizeMenu = res, err => err)
  }

  public toggleMenu() {
    this.showFullSizeMenu = !this.showFullSizeMenu;
    this._menuService.showFullSizeMenu(this.showFullSizeMenu);
  }

  public logOutClick() {
    localStorage.clear();
    this._router.navigate(["auth"]);
  }
}
