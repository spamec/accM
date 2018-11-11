import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WialonService} from '../../services/wialon.service';

@Injectable( {
  providedIn: 'root'
} )
export class WialonAccountsListService {

  constructor(private wialon: WialonService) {
    this.filtred = false;
    wialon.initPromise.then( () => {
      wialon.api.accountList().then( (data) => {
        this.accountList = data;
      } );
    } );
  }


  get accountList() {
    return this._accountListSubject.asObservable();
  }

  @Input( 'accountList' ) set accountList(data: any) {
    this._accountList = data;
    this._accountListSubject.next( data );
  }

  private _accountList: any;
  private _accountListSubject = new Subject<any>();


  get selectedOptions() {
    return this._selectedOptions;
  }

  @Input( 'selectedOptions' ) set selectedOptions(data: any) {

    this._selectedOptions = data;
    this._selectedOptionsSubject.next( this._selectedOptions );
  }

  private _selectedOptions: any;
  private _selectedOptionsSubject = new Subject<any>();

  get observableSelectedOptions() {
    return this._selectedOptionsSubject.asObservable();
  }

  public filtred = true;
}
