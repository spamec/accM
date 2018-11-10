import {Component, OnDestroy, OnInit} from '@angular/core';
import {WialonService} from '../../services/wialon.service';
import {WialonAccountsListService} from '../wialon-accounts-list/wialon-accounts-list.service';

@Component( {
  selector: 'app-wialon-hw-list',
  templateUrl: './wialon-hw-list.component.html',
  styleUrls: ['./wialon-hw-list.component.scss']
} )
export class WialonHwListComponent implements OnInit, OnDestroy {
  private time: any;
  // private subscribeTestObservible: any;

  _itemsSubscribe: any;
  _items: any;
  items: any;

  selectedOptions: any;

  // _accountListSubscribe: any;
  // _accountList: any;

  constructor(private wialonService: WialonService, private accountListService: WialonAccountsListService) {
    this._itemsSubscribe = this.wialonService.hwIdList.subscribe( data => {
      this._items = [];
      for (const accountId in data) {
        if (data.hasOwnProperty( accountId )) {
          if (this.accountListService.selectedOptions.indexOf( accountId ) !== -1) {
            this._items = this._items.concat( data[accountId] );
          }

        }
      }
      this._items = this._items.filter( (x, i, a) => a.indexOf( x ) === i );

      this.items = this._items;
      // this.onSearch(this.filter);
    } );
    /* this.subscribeTestObservible = wialonService.testObservable_GET().subscribe(data => {
       this.time = data;
     });*/

    /*  this.wialonService.getResponse()
      // resp is of type `HttpResponse<Config>`
        .subscribe(resp => {
          console.log(resp);
          // display its headers
          /!* const keys = resp.headers.keys();
           this.headers = keys.map(key =>
             `${key}: ${resp.headers.get(key)}`);/

           // access the body directly, which is typed as `Config`.
           this.config = { ... resp.body };*!/
        });*/
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this._itemsSubscribe.unsubscribe();
  }

  dataSelection(val: any) {
    console.log( val );
  }

  selectionChange(e) {
    console.log( e );
  }

}
