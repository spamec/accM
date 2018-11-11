import {Injectable, Input} from '@angular/core';
import {OnInit, OnDestroy} from '@angular/core';

@Injectable()
export class WialonBaseList implements OnInit, OnDestroy {
  constructor() {

  }

  _selectedSubscribe: any;
  selectedOptions: any;

  _itemsSubscribe: any;
  _items: any;
  items: any;
  filter: string;

  searching: boolean;
  _itemsEmpty: boolean;

  public getName(obj) {

    return (obj && obj.getName) ? obj.getName() : '';
  }

  public getId(obj) {
    return (obj && obj.getId) ? String( obj.getId() ) : '';
  }

  ngOnInit() {
    // this.filter = 'fddadas';
  }

  ngOnDestroy() {
    this._itemsSubscribe.unsubscribe();
  }

  onSearch(val: any) {
    const filterName = (value) => {
      let temp = this._items;
      if (this._items) {

        if (value && value.trim() !== '') {
          temp = this._items.filter( (item) => {
              return ((this.getName( item ) &&
                this.getName( item ).toLowerCase().indexOf( value.toLowerCase() ) > -1));
            }
          );

        } else {
          this.searching = false;
          this.filter = '';
        }

      }
      return temp;
    };

    const filterId = (value) => {
      let temp = this._items;
      if (this._items) {

        if (value && value.trim() !== '') {
          temp = this._items.filter( (item) => {

              return ((this.getId( item ) &&
                this.getId( item ).toLowerCase().indexOf( value.toLowerCase() ) > -1));
            }
          );

        } else {
          this.searching = false;
          this.filter = '';
        }

      }
      return temp;
    };


    this.searching = true;
    this.items = this._items;
    if (!val) {
      val = '';
    }

    if (Array.isArray( val )) {

      this.items = [];
      val.forEach( fval => {
        this.items = this.items.concat( filterId( fval ) );
      } );

    } else {
      this.items = filterName( val );


    }
    this._itemsEmpty = (this.items.length < 1);


  }


}
