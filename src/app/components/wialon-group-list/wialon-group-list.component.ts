import {Component, OnDestroy, OnInit} from '@angular/core';
import {WialonService} from '../../services/wialon.service';
import {WialonGroupListService} from './wialon-group-list.service';
import {WialonBaseList} from '../wialon-base-list';

@Component( {
  selector: 'app-wialon-group-list',
  templateUrl: './wialon-group-list.component.html',
  styleUrls: ['./wialon-group-list.component.scss']
} )
export class WialonGroupListComponent extends WialonBaseList implements OnInit, OnDestroy {

  selectedOptions: any;

  constructor(private wialonService: WialonService, public service: WialonGroupListService) {
    super();
    this.getItems();
  }

  getItems() {
    this._itemsSubscribe = this.service.groupList.subscribe( data => {
      this._items = data;
      this.onSearch( this.filter );
    } );
  }

  dataSelection(accountsId: any) {
    this.wialonService.updateHwId( accountsId );
  }

}
