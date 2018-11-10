import {Injectable, Input} from '@angular/core';
import {OnInit, OnDestroy} from '@angular/core';

@Injectable()
export class WialonBaseList implements OnInit, OnDestroy {
  constructor() {

  }

  _itemsSubscribe: any;
  _items: any;
  items: any;
  filter: string;

  searching: boolean;
  _itemsEmpty: boolean;

  private getName(obj) {
    return (obj && obj.getName) ? obj.getName() : '';
  }

  private getId(obj) {
    return (obj && obj.getId) ? obj.getId() : -1;
  }

  ngOnInit() {
    // this.filter = 'fddadas';
  }

  ngOnDestroy() {
    this._itemsSubscribe.unsubscribe();
  }

  onSearch(val: any) {
    if (!val) {
      val = '';
    }

    this.searching = true;
    this.items = this._items;

    if (this.items) {

      if (val && val.trim() !== '') {
        this.items = this.items.filter( (item) => {
            return ((this.getName( item ) &&
              this.getName( item ).toLowerCase().indexOf( val.toLowerCase() ) > -1));
          }
        );

      } else {
        this.searching = false;
        this.filter = '';
      }
      this._itemsEmpty = (this.items.length < 1);
    }

  }

}
