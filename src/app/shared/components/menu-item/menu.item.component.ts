import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuConstants } from '../../constants/menu.constants';
import { MenuService } from 'src/app/services/menu-service';

@Component({
    selector: 'menu-item',
    templateUrl: './menu.item.component.html',
    styleUrls: ['./menu.item.component.scss']
})
export class MenuItemComponent implements OnInit {

    @Input("menu-item") menuItem: any;
    @Input("index-item") indexItem: any;
    @Input("full-size-menu") fullSizeMenu: boolean;
    public menuData = MenuConstants;
    public childrenOpened: boolean = false;
    public activeTab: string;
    public activeChildTab: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _menuService: MenuService,
    ) {
        this._menuService.activeMenuTab.asObservable().subscribe(e => {
            this.activeChildTab = e.activeSubTab;
            this.activeTab =  e.activeTab;
        });

        this._menuService.toggledMenuIndex.asObservable().subscribe((e: number) => {
            if(e == this.indexItem){
                this.childrenOpened = true
            }else{
                this.childrenOpened = false
            }
        });

        this._menuService.fullSizeMenu.asObservable().subscribe((e: boolean) => {
            this.childrenOpened = e
        })
    }

    ngOnInit() {
        this.activeChildTab = this._activatedRoute.snapshot['_routerState'].url.replace('/', '')
        this.activeTab = this.activeChildTab.split('/')[0]
    }

    public toggleChildren() {
        if(!this.childrenOpened) {
            return;
        }
        this._menuService.setToggledMenuIndex(this.indexItem)
    }

    public menuItemClick(menuItem) {
        if(!this.childrenOpened) {
            return;
        }
        this._router.navigate([menuItem.path])
        this._menuService.showFullSizeMenu(false);
        this._menuService.setActiveMenuTab({
            activeSubTab: menuItem.path,
            activeTab: menuItem.path.split('/')[0]
        })
        this._menuService.activeMenuTab.subscribe(res => console.log(res))
    }

}
