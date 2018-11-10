import {TestBed} from '@angular/core/testing';

import {WialonGroupListService} from './wialon-group-list.service';

describe( 'WialonAccountsListService', () => {
  beforeEach( () => TestBed.configureTestingModule( {} ) );

  it( 'should be created', () => {
    const service: WialonGroupListService = TestBed.get( WialonGroupListService );
    expect( service ).toBeTruthy();
  } );
} );
