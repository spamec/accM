import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WialonAccountsListComponent} from './wialon-accounts-list.component';

describe( 'WialonAccountsListComponent', () => {
  let component: WialonAccountsListComponent;
  let fixture: ComponentFixture<WialonAccountsListComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [WialonAccountsListComponent]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( WialonAccountsListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
