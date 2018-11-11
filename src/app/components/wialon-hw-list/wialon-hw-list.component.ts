import {Component, OnDestroy, OnInit} from '@angular/core';
import {WialonService} from '../../services/wialon.service';
import {WialonAccountsListService} from '../wialon-accounts-list/wialon-accounts-list.service';
import {WialonHwListService} from './wialon-hw-list.service';
import {WialonBaseList} from '../wialon-base-list';

@Component( {
  selector: 'app-wialon-hw-list',
  templateUrl: './wialon-hw-list.component.html',
  styleUrls: ['./wialon-hw-list.component.scss']
} )
export class WialonHwListComponent extends WialonBaseList implements OnInit, OnDestroy {

  constructor(public service: WialonHwListService, private accountListService: WialonAccountsListService,) {
    super();
    this.filter = '';
    this.getItems();
    this.selectedOptions = [];
    this._selectedSubscribe = service.observableSelectedOptions.subscribe( options => {

      // if (this.selectedOptions !== options) {
      this.selectedOptions = options;
      console.log( 1, this.selectedOptions );
      // }
    } );
  }

  private _rawItems: any;

  getItems() {
    this._itemsSubscribe = this.service.hwIdList.subscribe( data => {
      this._rawItems = [];
      for (const accountId in data) {
        if (data.hasOwnProperty( accountId )) {
          if (this.accountListService.selectedOptions.indexOf( accountId ) !== -1) {
            this._rawItems = this._rawItems.concat( data[accountId] );
          }

        }
      }
      this._rawItems = this._rawItems.filter( (x, i, a) => a.indexOf( x ) === i );

      this.service.hwNameList( this._rawItems ).then( (hwNameList) => {

        this._items = hwNameList;
        this.onSearch( this.filter );
        setTimeout( () => {
          this.dataSelection( this.selectedOptions );
        }, 5000 );
      } );


      // this.onSearch(this.filter);
    } );
  }

  public getName(obj) {
    return (obj && obj.hasOwnProperty( 'name' )) ? obj.name : '';
  }

  public getId(obj) {
    return (obj && obj.hasOwnProperty( 'id' )) ? obj.id : -1;
  }

  dataSelection(hwsId: any) {
    console.log( hwsId );
    this.service.selectedOptions = hwsId;
  }

}
