import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEnvioComponent } from './select-envio.component';

describe('SelectEnvioComponent', () => {
  let component: SelectEnvioComponent;
  let fixture: ComponentFixture<SelectEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
