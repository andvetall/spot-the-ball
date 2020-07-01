import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuControl } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public toggledMenuIndex = new Subject<number>()
  public activeMenuTab = new Subject<MenuControl>()
  public fullSizeMenu = new Subject<boolean>()
  

  public showFullSizeMenu(state: boolean){
    this.fullSizeMenu.next(state)
  }

  public setActiveMenuTab(tab: MenuControl){
    this.activeMenuTab.next(tab)
  }

  public setToggledMenuIndex(index: number){
    this.toggledMenuIndex.next(index)
  }
}
