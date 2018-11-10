import {TestBed} from '@angular/core/testing';

import {WialonAccountsListService} from './wialon-accounts-list.service';

describe( 'WialonAccountsListService', () => {
  beforeEach( () => TestBed.configureTestingModule( {} ) );

  it( 'should be created', () => {
    const service: WialonAccountsListService = TestBed.get( WialonAccountsListService );
    expect( service ).toBeTruthy();
  } );
} );
