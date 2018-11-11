import {Component, OnInit, OnDestroy} from '@angular/core';
import {WialonAccountsListService} from './wialon-accounts-list.service';
import {WialonHwListService} from '../wialon-hw-list/wialon-hw-list.service';
import {WialonBaseList} from '../wialon-base-list';


@Component( {
  selector: 'app-wialon-accounts-list',
  templateUrl: './wialon-accounts-list.component.html',
  styleUrls: ['./wialon-accounts-list.component.scss']
} )
export class WialonAccountsListComponent extends WialonBaseList implements OnInit, OnDestroy {

  constructor(public service: WialonAccountsListService, private hwListService: WialonHwListService) {
    super();
    this.filter = 'sd';
    this.getItems();
    this._selectedSubscribe = service.observableSelectedOptions.subscribe( options => {
      // if (this.selectedOptions !== options) {
      if (this.service.filtred) {
        this.onSearch( options );
      } else {
        this.onSearch( this.filter );
      }
      this.selectedOptions = options;
      this.hwListService.updateHwId( options );
      // }
    } );
  }

  getItems() {
    this._itemsSubscribe = this.service.accountList.subscribe( data => {
      this._items = data;
      this.onSearch( this.filter );
    } );
  }

  dataSelection(accountsId: any) {
    console.log( 'new', accountsId );
    this.service.selectedOptions = accountsId;
  }

}
