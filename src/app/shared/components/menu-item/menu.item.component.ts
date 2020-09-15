import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    public activeTab: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _menuService: MenuService,
    ) {
        this._menuService.activeMenuTab.asObservable().subscribe(e => this.activeTab =  e.activeTab);
        this._menuService.fullSizeMenu.asObservable().subscribe((e: boolean) => e, err => err)
    }

    ngOnInit() {
        this.activeTab = this._activatedRoute.snapshot['_routerState'].url.replace('/', '').split('/')[0]
    }

    public menuItemClick(menuItem) {
        if(menuItem.title === 'Log Out') {
            localStorage.removeItem('user')
            this._router.navigate([menuItem.path])
        }
        this._router.navigate([menuItem.path])
        this._menuService.setActiveMenuTab({
            activeTab: menuItem.path.split('/')[0]
        })
        this._menuService.activeMenuTab.subscribe(res => res, err => err)
    }

}
