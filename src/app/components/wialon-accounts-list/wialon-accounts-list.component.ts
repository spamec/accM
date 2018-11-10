import {Component, OnInit, OnDestroy} from '@angular/core';
import {WialonService} from '../../services/wialon.service';
import {WialonAccountsListService} from './wialon-accounts-list.service';
import {WialonBaseList} from '../wialon-base-list';


@Component( {
  selector: 'app-wialon-accounts-list',
  templateUrl: './wialon-accounts-list.component.html',
  styleUrls: ['./wialon-accounts-list.component.scss']
} )
export class WialonAccountsListComponent extends WialonBaseList implements OnInit, OnDestroy {

  constructor(private wialonService: WialonService, public service: WialonAccountsListService) {
    super();
    this.filter = 'sd';
    this.getItems();
    // this.selectedOptions = service.selectedOptions;
  }

  getItems() {
    this._itemsSubscribe = this.service.accountList.subscribe( data => {
      this._items = data;
      this.onSearch( this.filter );
    } );
  }

  dataSelection(accountsId: any) {
    this.wialonService.updateHwId( accountsId );
  }

}
