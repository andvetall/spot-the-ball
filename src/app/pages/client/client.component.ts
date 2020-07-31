import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuConstants } from "../../shared/constants/menu.constants";
import { MenuService } from "src/app/services/menu-service";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit, AfterViewInit {

  @ViewChild("toolBar", null) toolBar: ElementRef;
  public menuData = MenuConstants;
  public showFullSizeMenu: boolean = false;
  public badgeData: number = 0;

  constructor(
    private _router: Router, 
    private _menuService: MenuService,
    private elementRef: ElementRef
    ) {
    this._menuService.fullSizeMenu.subscribe(res => this.showFullSizeMenu = res, err => err)
  }

  ngOnInit() {
    this.toolBar;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.tool-bar').addEventListener('mouseenter', this.toggleMenu.bind(this));
    this.elementRef.nativeElement.querySelector('.tool-bar').addEventListener('mouseleave', this.toggleMenu.bind(this));
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
