import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoRetiroComponent } from './punto-retiro.component';

describe('PuntoRetiroComponent', () => {
  let component: PuntoRetiroComponent;
  let fixture: ComponentFixture<PuntoRetiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoRetiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
