import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {WialonAccountsListService} from '../wialon-accounts-list/wialon-accounts-list.service';
import {WialonGroupListService} from '../wialon-group-list/wialon-group-list.service';
import {WialonHwListService} from '../wialon-hw-list/wialon-hw-list.service';

@Injectable( {
  providedIn: 'root'
} )
export class TasksListService {

  constructor(private http: HttpClient,
              private accountsListService: WialonAccountsListService,
              private groupListService: WialonGroupListService,
              private hwListService: WialonHwListService
  ) {
  }


  getRequest(): Observable<HttpResponse<{ timeId, accountsId, groupsId, hwId }[]>> {
    const headers = new HttpHeaders( {
      'Content-Type': 'application/json'
    } );

    /*const data = [4, 5, 6];*/


    // const body = {
    //   data:  data
    // };

    // return this.http.request<any>( 'POST', environment.api, {headers, body} );
    return this.http.request<any>( 'POST', environment.api );

  }

  setItem(item) {

    if (item.hasOwnProperty( 'accountsId' )) {
      this.accountsListService.filtred = true;
      this.accountsListService.selectedOptions = item.accountsId;
    } else {
      this.accountsListService.filtred = false;
      this.accountsListService.selectedOptions = [];

    }
    if (item.hasOwnProperty( 'groupsId' )) {
      this.groupListService.filtred = true;
      this.groupListService.selectedOptions = item.groupsId;
    } else {
      this.groupListService.filtred = false;
      this.groupListService.selectedOptions = [];

    }

    if (item.hasOwnProperty( 'hwId' )) {
      // this.hwListService.filtred = true;
      this.hwListService.selectedOptions = item.hwId;
    } else {
      // this.hwListService.filtred = false;
      this.hwListService.selectedOptions = [];

    }

  }
}
