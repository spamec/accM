import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WialonService} from '../../services/wialon.service';


@Injectable( {
  providedIn: 'root'
} )
export class WialonHwListService {

  constructor(private wialon: WialonService) {
    this._hwIdList = {};
  }

  get hwIdList() {
    return this._hwIdListSubject.asObservable();
  }

  @Input( 'hwIdList' ) set hwIdList(data: any) {
    this._hwIdList = data;
    this._hwIdListSubject.next( this._hwIdList );
  }

  get selectedOptions() {
    return this._selectedOptions;
  }

  @Input( 'selectedOptions' ) set selectedOptions(data: any) {

    this._selectedOptions = data;
    this._selectedOptionsSubject.next( this._selectedOptions );
  }

  get observableSelectedOptions() {
    return this._selectedOptionsSubject.asObservable();
  }

  private _hwIdList: any;
  private _hwIdListSubject = new Subject<any>();

  private _selectedOptions: any;
  private _selectedOptionsSubject = new Subject<any>();

  private _cashedHwNameList = [];

  public hwNameList(hwIdList: any[]) {
    const _filtration = (a, b) => {

      return a.filter( av => {
        if (av.hasOwnProperty( 'id' )) {
          return (b.findIndex( bv => {
            return av.id === bv;
          } ) >= 0);
        } else {
          return false;
        }
      } );
    };

    return new Promise( (resolve, reject) => {

      const _filtered = hwIdList.filter( (value, index) => {
        return (this._cashedHwNameList.findIndex( k => {
          return (k.hasOwnProperty( 'id' )) ? k.id === value : false;
        } ) < 0);
      } );

      if (_filtered.length > 0) {
        this.wialon.api.hwNameList( _filtered ).then( (data) => {
          this._cashedHwNameList = this._cashedHwNameList.concat( data );
          resolve( _filtration( this._cashedHwNameList, hwIdList ) );

        } );
      } else {
        resolve( _filtration( this._cashedHwNameList, hwIdList ) );
      }


    } );
  }

  public updateHwId(listOfAccountId: any[]) {
    const __hwIdList = {};
    const __promises = [];
    listOfAccountId.forEach( (accountId) => {
      __promises.push( this._apiHwIdList( accountId ) );

    } );

    Promise.all( __promises ).then( (answers: any) => {
      answers.forEach( (data: { accountId, items }) => {
        __hwIdList[data.accountId] = data.items;
      } );
      this.hwIdList = __hwIdList;

    } );

  }

  private _apiHwIdList(accountId) {
    return new Promise( (resolve, reject) => {
      let items = [];
      if (!this._hwIdList.hasOwnProperty( accountId )) {
        this.wialon.api.hwIdList( accountId ).then( _items => {

          items = _items;
          resolve( {accountId, items} );
        } );
      } else {
        items = this._hwIdList[accountId];
        resolve( {accountId, items} );
      }
    } );
  }
}
