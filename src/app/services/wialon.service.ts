import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable( {providedIn: 'root'} )
export class WialonService {

  constructor(private http: HttpClient) {
    this._wialon = window['wialon'];
    this._qx = window['qx'];
    this._init();

  }


  private _wialon: any;
  private _qx: any;
  private _isLogin: boolean;


  public initPromise;
  public api;

  static getName(obj) {
    return (obj && obj.getName) ? obj.getName() : '';
  }

  static getId(obj) {
    return (obj && obj.getId) ? obj.getId() : -1;
  }

  private static getHtmlVar(name) {
    if (!name) {
      return null;
    }
    const pairs = decodeURIComponent( document.location.search.substr( 1 ) ).split( '&' );
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split( '=' );
      if (pair[0] === name) {
        pair.splice( 0, 1 );
        return pair.join( '=' );
      }
    }
    return null;
  }

  /* private testHttp() {
     this.http.get<any>(environment.api + '?action=get').pipe(
       catchError(this.handleError)
     );
   }*/

  getResponse(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders( {
      'Content-Type': 'application/json'
    } );

    return this.http.request<any>( 'GET', environment.api + '/item/12345' );

  }


  private _init() {


    this.initPromise = this.initSdk();
    this.initPromise.then( () => {
      this.api = {
        accountList: () => {

          return new Promise( (resolve, reject) => {
            if (!this._isLogin) {
              resolve( [] );
            }
            const spec_acc = {
              itemsType: 'avl_resource',
              propName: 'sys_name',
              propValueMask: '*',
              sortType: 'sys_name'
            };
            const flags_acc = this._wialon.item.Item.dataFlag.base;
            this._wialon.core.Session.getInstance().searchItems( spec_acc, true, flags_acc,
              0, 0, this._qx.lang.Function.bind( function (code, data) {
                if (code || !data) {
                  console.log( ('List of units empty.') );
                } else if (!data.items || data.items.length < 1) {
                  console.log( ('List of units empty.') );
                } else {


                  resolve( data.items );

                }
              }, this ) );
          } );


        },
        groupList: () => {

          return new Promise( (resolve, reject) => {

            if (!this._isLogin) {
              resolve( [] );
            }

            const spec_group = {
              itemsType: 'avl_unit_group',
              propName: 'sys_name',
              propValueMask: '*',
              sortType: 'sys_name'
            };
            const flags_group = this._wialon.item.Item.dataFlag.base;
            this._wialon.core.Session.getInstance().searchItems( spec_group, true, flags_group,
              0, 0, this._qx.lang.Function.bind( function (code, data) {
                if (code || !data) {
                  console.log( ('List of units empty.') );
                } else if (!data.items || data.items.length < 1) {
                  console.log( ('List of units empty.') );
                } else {

                  resolve( data.items );

                }
              }, this ) );
          } );


        },
        hwIdList: (accountId: any) => {
          return new Promise( (resolve, reject) => {

            let items = [];
            if (!this._isLogin) {
              resolve( items );
            }
            // if (!this._hwIdList.hasOwnProperty( accountId )) {
            const spec_group = {
              itemsType: 'avl_unit',
              propName: 'sys_billing_account_guid',
              propValueMask: accountId || '*',
              sortType: 'sys_name'
            };

            const flags_group = 257;
            this._wialon.core.Session.getInstance().searchItems( spec_group, true, flags_group,
              0, 0, this._qx.lang.Function.bind( function (code, data) {
                if (code || !data) {
                  console.log( (accountId + ': List of units empty.') );
                } else if (!data.items || data.items.length < 1) {
                  console.log( (accountId + 'List of units empty.') );
                } else {
                  items = data.items.reduce( function (carry, item) {
                    if (item.getDeviceTypeId() && (-1 === carry.indexOf( item.getDeviceTypeId() ))) {
                      carry.push( item.getDeviceTypeId() );
                    }
                    return carry;
                  }, [] );
                }
                resolve( items );
              }, this ) );
            /* } else {
               items = this._hwIdList[accountId];
               resolve( items);
             }*/

          } );


        },

        hwNameList: (hwIdList: string[]) => {
          return new Promise( (resolve, reject) => {
            let items = [];
            if (!this._isLogin) {
              resolve( items );
            }
            const param = {
              filterType: 'id',
              filterValue: hwIdList,
              includeType: false,
              ignoreRename: false
            };
            this._wialon.core.Session.getInstance().getHwTypes( param, this._qx.lang.Function.bind( function (code, data) {

              if (code || !data) {
                console.log( ('List of hw empty.') );
              } else {
                items = data;
              }
              resolve( items );
            }, this ) );
          } );

        }
      };

    } ).catch( (e) => {
      console.log( 'initSdk: ' + e );
    } );
  }


  private addSid(code) {
    if (code) {
      return;
    }
    const sid = this._wialon.core.Session.getInstance().getId();
    const user = this._wialon.core.Session.getInstance().getCurrUser().getName();

    const pathArray = window.location.href.split( '/' );
    const protocol = pathArray[0];
    const host = pathArray[2];
    const url = protocol + '//' + host;
    window.location.href = window.location.href + '?sid=' + sid + '&user_name=' + user;
  }

  private login(code) {

    if (code) {
      this._isLogin = false;
      console.log( 'Login error' );
    } else {
      this._isLogin = true;
      console.log( 'Successful login' );
    }
    return this._isLogin;
  }

  private initSdk() {
    return new Promise( (resolve, reject) => {
      const url = WialonService.getHtmlVar( 'baseUrl' ) || WialonService.getHtmlVar( 'hostUrl' ) || 'https://hst-api.wialon.com';
      const user = WialonService.getHtmlVar( 'user_name' ) || '';
      this._wialon.core.Session.getInstance().initSession( url );

      const hash = WialonService.getHtmlVar( 'access_hash' );
      const token = WialonService.getHtmlVar( 'access_token' ) || environment.token;
      const sid = WialonService.getHtmlVar( 'sid' );

      if (hash) {
        if (!sid) {
          this._wialon.core.Session.getInstance().loginAuthHash( hash, this._qx.lang.Function.bind( this.addSid, this ) );
        }
      } else if (sid) {
        this._wialon.core.Session.getInstance().duplicate( sid, user, true, this._qx.lang.Function.bind( (code) => {
          (this.login( code )) ? resolve( true ) : reject( false );
        }, this ) );
      } else if (token) {
        this._wialon.core.Session.getInstance().loginToken( token, this._qx.lang.Function.bind( this.addSid, this ) );
      } else {
        // login(101);
      }
    } );

  }


}
