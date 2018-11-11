import {Component, OnDestroy, OnInit, OnChanges} from '@angular/core';
import {WialonService} from '../../services/wialon.service';
import {WialonGroupListService} from './wialon-group-list.service';

import {WialonBaseList} from '../wialon-base-list';

@Component( {
  selector: 'app-wialon-group-list',
  templateUrl: './wialon-group-list.component.html',
  styleUrls: ['./wialon-group-list.component.scss']
} )
export class WialonGroupListComponent extends WialonBaseList implements OnInit, OnDestroy, OnChanges {

  constructor(public service: WialonGroupListService) {
    super();
    this.filter = '';
    this.getItems();
    this.selectedOptions = [];
    this._selectedSubscribe = service.observableSelectedOptions.subscribe( options => {
      if (this.service.filtred) {
        this.onSearch( options );
      } else {
        this.onSearch( this.filter );
      }
      // if (this.selectedOptions !== options) {
      this.selectedOptions = options;
      // }
    } );
  }

  ngOnChanges() {
    console.log( 'ngOnChanges' );
  }

  getItems() {
    this._itemsSubscribe = this.service.groupList.subscribe( data => {
      this._items = data;
      this.onSearch( this.filter );
    } );
  }

  dataSelection(groupsId: any) {
    this.service.selectedOptions = groupsId;
  }

}
