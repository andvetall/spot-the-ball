import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuControl } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public activeMenuTab = new Subject<MenuControl>()
  public fullSizeMenu = new Subject<boolean>()
  

  public showFullSizeMenu(state: boolean){
    this.fullSizeMenu.next(state)
  }

  public setActiveMenuTab(tab: MenuControl){
    this.activeMenuTab.next(tab)
  }

}
