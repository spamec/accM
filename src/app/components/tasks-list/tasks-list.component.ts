import {Component, OnInit, OnDestroy} from '@angular/core';
import {TasksListService} from './tasks-list.service';
import {WialonBaseList} from '../wialon-base-list';
import {HttpResponse} from '@angular/common/http';

@Component( {
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
} )
export class TasksListComponent extends WialonBaseList implements OnInit, OnDestroy {

  constructor(public service: TasksListService) {
    super();
    this.filter = '';
    this.newItem = false;
    this.getItems();
  }

  public _iconLoad = false;

  public newItem;

  // public item;


  ngOnInit() {
    setTimeout( () => {
      this._iconLoad = true;
    }, 1000 ); // todo :)

  }

  private formatedDate(timeId) {
    const date = new Date( timeId * 1000 );
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  public getName(obj) {
    return (obj && obj.hasOwnProperty( 'timeId' )) ? this.formatedDate( obj.timeId ) : '';
  }

  public getId(obj) {
    return (obj && obj.hasOwnProperty( 'timeId' )) ? obj.timeId : -1;
  }


  public getItems() {
    this.service.getRequest().subscribe( (data) => {
      this._items = data;
      this.onSearch( this.filter );
    } );
  }

  public setItem(item) {
    this.service.setItem( item );
  }


  dataSelection(list: any) {
    // this.hwListService.updateHwId( accountsId );
  }

}
