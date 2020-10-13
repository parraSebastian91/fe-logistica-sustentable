import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEncomiendaComponent } from './formulario-encomienda.component';

describe('FormularioEncomiendaComponent', () => {
  let component: FormularioEncomiendaComponent;
  let fixture: ComponentFixture<FormularioEncomiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioEncomiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
