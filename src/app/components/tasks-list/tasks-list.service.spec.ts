import {TestBed} from '@angular/core/testing';

import {TasksListService} from './tasks-list.service';

describe( 'TasksListService', () => {
  beforeEach( () => TestBed.configureTestingModule( {} ) );

  it( 'should be created', () => {
    const service: TasksListService = TestBed.get( TasksListService );
    expect( service ).toBeTruthy();
  } );
} );
