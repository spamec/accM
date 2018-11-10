import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WialonService} from '../../services/wialon.service';

@Injectable( {
  providedIn: 'root'
} )
export class WialonGroupListService {

  constructor(private wialon: WialonService) {
    wialon.initPromise.then( () => {
      wialon.api.aroupList().then( (data) => {
        this.groupList = data;
      } );
    } );
  }

  get groupList() {
    return this._groupListSubject.asObservable();
  }

  @Input( 'groupList' ) set groupList(data: any) {
    this._groupList = data;
    this._groupListSubject.next( data );
  }

  private _groupList: any;
  private _groupListSubject = new Subject<any>();


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
}
