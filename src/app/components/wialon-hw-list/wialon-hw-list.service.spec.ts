import {TestBed} from '@angular/core/testing';

import {WialonHwListService} from './wialon-hw-list.service';

describe( 'WialonHwListService', () => {
  beforeEach( () => TestBed.configureTestingModule( {} ) );

  it( 'should be created', () => {
    const service: WialonHwListService = TestBed.get( WialonHwListService );
    expect( service ).toBeTruthy();
  } );
} );
