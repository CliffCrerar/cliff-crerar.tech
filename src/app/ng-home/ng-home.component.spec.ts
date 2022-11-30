import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHomeComponent } from './ng-home.component';

describe('NgHomeComponent', () => {
  let component: NgHomeComponent;
  let fixture: ComponentFixture<NgHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
