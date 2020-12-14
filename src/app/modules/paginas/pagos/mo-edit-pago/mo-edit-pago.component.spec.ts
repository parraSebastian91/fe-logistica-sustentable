import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoEditPagoComponent } from './mo-edit-pago.component';

describe('MoEditPagoComponent', () => {
  let component: MoEditPagoComponent;
  let fixture: ComponentFixture<MoEditPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoEditPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoEditPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
