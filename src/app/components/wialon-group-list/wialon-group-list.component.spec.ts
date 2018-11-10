import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WialonGroupListComponent} from './wialon-group-list.component';

describe( 'WialonGroupListComponent', () => {
  let component: WialonGroupListComponent;
  let fixture: ComponentFixture<WialonGroupListComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [WialonGroupListComponent]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( WialonGroupListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
