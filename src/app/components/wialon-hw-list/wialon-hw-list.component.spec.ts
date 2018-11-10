import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WialonHwListComponent} from './wialon-hw-list.component';

describe( 'WialonHwListComponent', () => {
  let component: WialonHwListComponent;
  let fixture: ComponentFixture<WialonHwListComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [WialonHwListComponent]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( WialonHwListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
