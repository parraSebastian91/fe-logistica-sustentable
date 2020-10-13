import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEncomiendaMasivoComponent } from './formulario-encomienda-masivo.component';

describe('FormularioEncomiendaMasivoComponent', () => {
  let component: FormularioEncomiendaMasivoComponent;
  let fixture: ComponentFixture<FormularioEncomiendaMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioEncomiendaMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEncomiendaMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
