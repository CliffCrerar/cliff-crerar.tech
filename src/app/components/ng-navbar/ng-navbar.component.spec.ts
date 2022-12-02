import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNavbarComponent } from './ng-navbar.component';

describe('NgNavbarComponent', () => {
  let component: NgNavbarComponent;
  let fixture: ComponentFixture<NgNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
